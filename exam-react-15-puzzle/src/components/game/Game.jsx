import React, { useEffect, useState, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
//import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { updateGameTime, updateClickCount, updateBestTime, updateMinStep } from '../../share/reducers/game.reducer';
//import styles from './Game.module.css';

const App = () => {
    const dispatch = useDispatch();
    const gameTime = useSelector((state) => state.game.gameTime);
    const clickCount = useSelector((state) => state.game.clickCount);
    const boardSize = useSelector((state) => state.game.boardSize);
    //console.log(boardSize);
    const shuffleMaxCount = 20; // Максимальна кількість кроків перемішування
    const sizePuzzle = boardSize;
    //const sizePuzzle = 3;

    const [arrBoxNumbers, setArrBoxNumbers] = useState([]);               // збереження номерів клітинок на полі гри  
    const [previousCord, setPreviousCord] = useState({ i: -1, j: -1 });   // збереження попередньої клітинки 
    const [emptyCell, setEmptyCell] = useState({ i: sizePuzzle - 1, j: sizePuzzle - 1 });           // збереження порожньої клітинки
    const [shuffleCount, setShuffleCount] = useState(0);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [disable, setDisable] = useState(false);

    const winArrBoxNumbers = useMemo(() => {                              // збереження номерів клітинок для виграшу
        const newNumbers = [];
        let number = 1;
        for (let i = 0; i < sizePuzzle; i++) {
            newNumbers[i] = [];
            for (let j = 0; j < sizePuzzle; j++) {
                newNumbers[i][j] = number++;
            }
        }
        newNumbers[sizePuzzle - 1][sizePuzzle - 1] = '';
        return newNumbers;
    }, [sizePuzzle]);


    useEffect(() => {                     // Ефект для перевірки умови виграшу при зміні стану arrBoxNumbers або winArrBoxNumbers   
        const winCheck = arrBoxNumbers.flat().every((value, index) => value === winArrBoxNumbers.flat()[index]);

        if (winCheck && isGameStarted) {
            //setTimeout(() => alert('Win combo!!!!'), 300);
            console.log('Win combo!!!!');
            setIsGameStarted(false);
            dispatch(updateBestTime(gameTime));
            dispatch(updateMinStep(clickCount));
        }
    }, [arrBoxNumbers, winArrBoxNumbers, isGameStarted]);

    useEffect(() => {                  // Ефект для ініціалізації гри при завантаженні компонента
        Game();
    }, [boardSize]);

    useEffect(() => {                   //Ефект при компьютерному змішуванні поля
        if (shuffleCount > 0 && shuffleCount < shuffleMaxCount) {
            setDisable(true);
            const timer = setInterval(() => {
                handleResortClick();

                if (shuffleCount >= shuffleMaxCount - 1) {
                    setDisable(false);
                    clearInterval(timer);
                    setShuffleCount(0);
                    dispatch(updateClickCount(0));
                    dispatch(updateGameTime(0));
                    setIsGameStarted(true);
                }
            }, 200);

            return () => clearInterval(timer);
        }
    }, [shuffleCount]);

    useEffect(() => {                                  //  update the game time
        if (isGameStarted) {
            const interval = setInterval(() => {
                if (!isGameStarted) {
                    clearInterval(interval);
                } else {
                    dispatch(updateGameTime(gameTime + 1));
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isGameStarted, gameTime]);

    const createTableCell = (i, j, content) => (                          // Функція для створення HTML-коду для клітинки таблиці              
        <td key={`${i}${j}`} onClick={() => cellOnclick(i, j)} data-attr={content === '' ? 'emptyCell' : null}>
            <div className='cell'>{content}</div>
        </td>
    );

    const cellOnclick = (i, j) => {                                        // Функція, яка відповідає за клік по клітинці
        if (isGameStarted) {
            if (
                (i === emptyCell.i && (j - emptyCell.j === 1 || j - emptyCell.j === -1)) ||
                (j === emptyCell.j && (i - emptyCell.i === 1 || i - emptyCell.i === -1))
            ) {
                setArrBoxNumbers((prevNumbers) => {
                    const newNumbers = prevNumbers.map((row) => [...row]);
                    newNumbers[emptyCell.i][emptyCell.j] = newNumbers[i][j];
                    newNumbers[i][j] = '';
                    setEmptyCell({ i, j });
                    return newNumbers;
                });
                dispatch(updateClickCount(clickCount + 1));
            }
        }
    };

    const Game = () => {                                   // Функція для ініціалізації гри
        const newNumbers = [];
        let initEmptyCell = { i: sizePuzzle - 1, j: sizePuzzle - 1 };
        let number = 1;

        for (let i = 0; i < sizePuzzle; i++) {
            newNumbers[i] = [];
            for (let j = 0; j < sizePuzzle; j++) {
                newNumbers[i][j] = number++;
                if (i === sizePuzzle - 1 && j === sizePuzzle - 1) {
                    initEmptyCell = { i, j };
                }
            }
        }
        newNumbers[sizePuzzle - 1][sizePuzzle - 1] = '';

        setEmptyCell({ i: initEmptyCell.i, j: initEmptyCell.j });

        setArrBoxNumbers(newNumbers);

        dispatch(updateClickCount(0));

        dispatch(updateGameTime(0));
    };


    const handleResetClick = () => {           // Функція для обробки кліку на кнопці "Reset"
        setIsGameStarted(false);
        Game();
    };



    const handleResortClick = () => {                        // Функція для обробки кліку на кнопці "Перемішати"

        //setArrBoxNumbers(shuffleArray(arrBoxNumbers));
        setArrBoxNumbers((prevArrBoxNumbers) => shuffleArray(prevArrBoxNumbers));
        setShuffleCount((prevCount) => prevCount + 1);

    };


    function shuffleArray(array) {                     // Функція для перемішування клітинок

        let arrValidCoord = [];       // Створення масиву з координатами клітинок, які можуть здійснити переміщення
        for (let i = 0; i < sizePuzzle; i++) {
            for (let j = 0; j < sizePuzzle; j++) {
                if ((i === emptyCell.i && ((j - emptyCell.j) === 1 || (j - emptyCell.j) === -1)) ||
                    (j === emptyCell.j && (i - emptyCell.i === 1 || i - emptyCell.i === -1))) {
                    arrValidCoord.push({ i, j });
                }
            }
        }
        // console.log(arrValidCoord, previousCord.i, previousCord.j );
        arrValidCoord = arrValidCoord.filter(coord => !(coord.i === previousCord.i && coord.j === previousCord.j));  // Видалення попередньої клітинки зі списку валідних координат
        //console.log(arrValidCoord);

        let oneRandomValidCoord = arrValidCoord[Math.floor(Math.random() * arrValidCoord.length)]; // Вибір одної валідної координати 
        // console.log(oneRandomValidCoord);

        const newArray = array.map(row => [...row]);                 // Створення нового масиву з перемішаними клітинками
        newArray[emptyCell.i][emptyCell.j] = newArray[oneRandomValidCoord.i][oneRandomValidCoord.j];
        newArray[oneRandomValidCoord.i][oneRandomValidCoord.j] = '';
        setPreviousCord({ i: emptyCell.i, j: emptyCell.j });        // Оновлення попередньої клітинки та порожньої клітинки
        setEmptyCell({ i: oneRandomValidCoord.i, j: oneRandomValidCoord.j });
        //console.log(newArray, previousCord, oneRandomValidCoord);
        return newArray;
    }

    ////////////////////////    Astar    //////////////////////////////////////////////////

    const aStarSearch = () => {
        // Очищаємо попередні дані
        const openList = []; // Список відкритих вузлів
        const closedList = []; // Список закритих вузлів

        // Початковий вузол
        const startNode = {
            state: arrBoxNumbers,
            g: 0,
            h: calculateHeuristic(arrBoxNumbers), // Розрахунок евристичної відстані
            f: 0, // Сумарна оцінка
            parent: null // Попередній вузол
        };
        console.log('startNode', startNode);
        // Додаємо початковий вузол до відкритого списку
        openList.push(startNode);
        while (openList.length > 0) {
            // Вибираємо вузол з найменшою сумарною оцінкою
            let currentNode = openList[0];
            let currentIndex = 0;
            openList.forEach((node, index) => {
                if (node.f < currentNode.f) {
                    currentNode = node;
                    currentIndex = index;
                }
            });

            // Переміщаємо обраний вузол до закритого списку
            openList.splice(currentIndex, 1);
            closedList.push(currentNode);

            // Якщо досягли цільового стану, завершуємо алгоритм
            if (isGoalState(currentNode.state)) {
                return currentNode;
            }

            // Генеруємо наступні можливі стани та перевіряємо їх
            console.log('currentNode.state', currentNode.state);
            const possibleMoves = generatePossibleMoves(currentNode.state);
            possibleMoves.forEach((move) => {
                // Якщо цей стан вже був оброблений, пропускаємо його
                if (isStateInList(move, closedList)) {
                    return;
                }

                // Розраховуємо нові значення g та h
                const g = currentNode.g + 1; // Вартість одного кроку
                const h = calculateHeuristic(move);
                const f = g + h;

                // Перевіряємо, чи цей стан вже є у відкритому списку
                let isInOpenList = false;
                openList.forEach((node) => {
                    if (compareStates(node.state, move)) {
                        isInOpenList = true;
                        // Якщо новий шлях коротший, оновлюємо дані
                        if (g < node.g) {
                            node.g = g;
                            node.f = f;
                            node.parent = currentNode;
                        }
                    }
                });

                // Якщо стану немає у відкритому списку, додаємо його
                if (!isInOpenList) {
                    openList.push({ state: move, g, h, f, parent: currentNode });
                }
            });
        }

        // Якщо відкритий список порожній і ми не досягли цілі, повертаємо null
        return null;
    };

    // Функція для розрахунку евристичної відстані (кількість клітин, які не на своєму місці)
    const calculateHeuristic = (state) => {
        let misplacedTiles = 0;
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state[i].length; j++) {
                if (state[i][j] !== winArrBoxNumbers[i][j]) {
                    misplacedTiles++;
                }
            }
        }
        console.log(misplacedTiles);
        return misplacedTiles;
    };

    // Перевірка, чи поточний стан є цільовим
    const isGoalState = (state) => {
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state[i].length; j++) {
                if (state[i][j] !== winArrBoxNumbers[i][j]) {
                    return false;
                }
            }
        }
        return true;
    };

    // Генерує всі можливі ходи для даного стану
    const generatePossibleMoves = (state) => {
        const possibleMoves = [];
        // Знаходимо координати порожньої клітинки
        let emptyCellCoord;
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state[i].length; j++) {
                if (state[i][j] === '') {
                    emptyCellCoord = { i, j };
                    console.log(emptyCellCoord);
                    break;
                }
            }
        }

        // Знаходимо координати усіх можливих ходів
        const possibleMoveCoords = [];
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state[i].length; j++) {
                if (
                    (i === emptyCellCoord.i && Math.abs(j - emptyCellCoord.j) === 1) ||
                    (j === emptyCellCoord.j && Math.abs(i - emptyCellCoord.i) === 1)
                ) {
                    possibleMoveCoords.push({ i, j });
                }
            }
        }
        console.log(possibleMoveCoords);
        // Генеруємо новий стан поля для кожного доступного ходу
        for (const coord of possibleMoveCoords) {
            // const newBoardState = JSON.parse(JSON.stringify(state)); // Для копіювання масиву
            const newBoardState = state.map(row => [...row]);
            const temp = newBoardState[emptyCellCoord.i][emptyCellCoord.j];
            newBoardState[emptyCellCoord.i][emptyCellCoord.j] = newBoardState[coord.i][coord.j];
            newBoardState[coord.i][coord.j] = temp;
            possibleMoves.push(newBoardState);
        }
        console.log(possibleMoves);
        return possibleMoves;
    };

    // Перевіряє, чи даний стан вже є у списку вузлів
    const isStateInList = (state, list) => {
        for (let i = 0; i < list.length; i++) {
            if (compareStates(list[i].state, state)) {
                return true;
            }
        }
        return false;
    };

    // Порівнює два стани поля
    const compareStates = (state1, state2) => {
        for (let i = 0; i < state1.length; i++) {
            for (let j = 0; j < state1[i].length; j++) {
                if (state1[i][j] !== state2[i][j]) {
                    return false;
                }
            }
        }
        return true;
    };

    const reconstructPath = (solvedTrack) => {
        const path = [];
        let currentNode = solvedTrack;

        // Продовжуємо переходити до батьківського вузла, поки не досягнемо початкового вузла
        while (currentNode !== null) {
            path.unshift(currentNode.state); // Додаємо стан вузла в початок шляху
            currentNode = currentNode.parent; // Переходимо до батьківського вузла
        }

        return path;
    };



    const handleAIPlayClick = () => {
        const solvedTrack = aStarSearch();
        console.log(solvedTrack);
        if (!solvedTrack) {
            console.log('No solution found!');
            return;
        }
        // Відтворіть шлях від цільового вузла до початкового вузла
        const pathToGoal = reconstructPath(solvedTrack);
        console.log(pathToGoal);
        // Пройдіть по кожному стану шляху з інтервалом
        let index = 0;
        const interval = setInterval(() => {
            if (index < pathToGoal.length) {
                const state = pathToGoal[index];
                setArrBoxNumbers(state);              
                console.log(arrBoxNumbers);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 1000); // Інтервал у мілісекундах між кроками

    }




    //////////////////////////////////////////////////////////////////////////


    return (
        <main>
            <div className="container">
                <div className='table-wrap'>
                    <table>
                        <tbody>
                            {arrBoxNumbers.map((row, i) => (
                                <tr key={i}>
                                    {row.map((cell, j) => createTableCell(i, j, cell))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="btn-wrap">
                    <Button onClick={handleResetClick}>Reset</Button>
                    {/* <Button >Start</Button> */}
                    <Button disabled={disable} onClick={handleResortClick}>Resort</Button>
                    <Button onClick={handleAIPlayClick}>
                        AI Play.</Button>
                </div>
            </div>
        </main>
    );
};

export default App;