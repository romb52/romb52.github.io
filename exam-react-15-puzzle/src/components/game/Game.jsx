import React, { useEffect, useState, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { updateGameTime, updateClickCount, updateBestTime, updateMinStep } from '../../share/reducers/game.reducer';
import { playSound, soundNames } from '../../share/audioUtils';
//import styles from './Game.module.css';

const App = () => {
    const dispatch = useDispatch();
    const gameTime = useSelector((state) => state.game.gameTime);
    const clickCount = useSelector((state) => state.game.clickCount);
    const boardSize = useSelector((state) => state.game.boardSize);
    const soundOn = useSelector(state => state.sound.soundOn);
    const shuffleMaxCount = 20; // Максимальна кількість кроків перемішування
    const sizePuzzle = boardSize;

    const [arrBoxNumbers, setArrBoxNumbers] = useState([]);               // збереження номерів клітинок на полі гри  
    const [previousCord, setPreviousCord] = useState({ i: -1, j: -1 });   // збереження попередньої клітинки 
    const [emptyCell, setEmptyCell] = useState({ i: sizePuzzle - 1, j: sizePuzzle - 1 });           // збереження порожньої клітинки
    const [shuffleCount, setShuffleCount] = useState(0);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [disableMixBtn, setDisableMixBtn] = useState(false);
    const [disableAiBtn, setDisableAiBtn] = useState(false);
    const [message, setMessage] = useState("");

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
            setMessage(`Win combo!!!! time: ${gameTime}, make ${clickCount} moves`);
            if (soundOn) { playSound(soundNames.winGame); }
            setIsGameStarted(false);
            setEmptyCell({ i: sizePuzzle - 1, j: sizePuzzle - 1 });
            dispatch(updateBestTime(gameTime));
            dispatch(updateMinStep(clickCount));
        }
    }, [arrBoxNumbers, winArrBoxNumbers, isGameStarted]);


    useEffect(() => {                  // Ефект для ініціалізації гри при завантаженні компонента
        Game();
    }, [boardSize]);

    useEffect(() => {                   //Ефект при компьютерному змішуванні поля
        if (shuffleCount > 0 && shuffleCount < shuffleMaxCount) {
            setDisableMixBtn(true);
            if (soundOn) { playSound(soundNames.makeMove); }
            const timer = setInterval(() => {
                handleResortClick();

                if (shuffleCount >= shuffleMaxCount - 1) {
                    setDisableMixBtn(false);
                    clearInterval(timer);
                    setShuffleCount(0);
                    dispatch(updateClickCount(0));
                    dispatch(updateGameTime(0));
                    setIsGameStarted(true);
                    setMessage("Tiles are mixed. Start to play");
                }
            }, 200);

            return () => clearInterval(timer);
        }
    }, [shuffleCount, dispatch]);

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
    }, [isGameStarted, gameTime, dispatch]);

    const createTableCell = (i, j, content) => (                          // Функція для створення HTML-коду для клітинки таблиці              
        <td key={`${i}${j}`} onClick={() => cellOnclick(i, j)} data-attr={content === '' ? 'emptyCell' : null}>
            <div className='cell'>{content}</div>
        </td>
    );

    const cellOnclick = (i, j) => {                                        // Функція, яка відповідає за клік по клітинці
        if (isGameStarted) {
            if (soundOn) { playSound(soundNames.makeMove); }
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
                setMessage([
                    "Great move! Keep it up!",
                    "Well done! You're making progress!",
                    "Nice choice! You're getting closer to victory!",
                    "Awesome move! You're on the right track!",
                    "Impressive! Your puzzle-solving skills are shining!",
                ][Math.floor(Math.random() * 5)]);
            }
        }
        else {
            setMessage("Mix to start");
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

        setMessage("Slide the numbered tiles into the correct order by moving them into the empty space. Try to solve the puzzle with the fewest moves possible! Mix to start")
    };


    const handleResetClick = () => {           // Функція для обробки кліку на кнопці "Reset"
        setIsGameStarted(false);
        setMessage("Slide the numbered tiles into the correct order by moving them into the empty space. Try to solve the puzzle with the fewest moves possible! Mix to start")
        Game();
    };



    const handleResortClick = () => {                        // Функція для обробки кліку на кнопці "Перемішати"
        //setArrBoxNumbers(shuffleArray(arrBoxNumbers));
        setArrBoxNumbers((prevArrBoxNumbers) => shuffleArray(prevArrBoxNumbers));
        setShuffleCount((prevCount) => prevCount + 1);
        setMessage("Tiles are mixing...")

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
        arrValidCoord = arrValidCoord.filter(coord => !(coord.i === previousCord.i && coord.j === previousCord.j));  // Видалення попередньої клітинки зі списку валідних координат

        let oneRandomValidCoord = arrValidCoord[Math.floor(Math.random() * arrValidCoord.length)]; // Вибір одної валідної координати 

        const newArray = array.map(row => [...row]);                 // Створення нового масиву з перемішаними клітинками
        newArray[emptyCell.i][emptyCell.j] = newArray[oneRandomValidCoord.i][oneRandomValidCoord.j];
        newArray[oneRandomValidCoord.i][oneRandomValidCoord.j] = '';
        setPreviousCord({ i: emptyCell.i, j: emptyCell.j });        // Оновлення попередньої клітинки та порожньої клітинки
        setEmptyCell({ i: oneRandomValidCoord.i, j: oneRandomValidCoord.j });
        return newArray;
    }

    ////////////////////////////////////////////    Astar    //////////////////////////////////////////////////

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
                if (!isInOpenList) {                      // Якщо стану немає у відкритому списку, додаємо його
                    openList.push({ state: move, g, h, f, parent: currentNode });
                }
            });
        }

        // Якщо відкритий список порожній і ми не досягли цілі, повертаємо null
        return null;
    };

    // Функція для розрахунку евристичної відстані (кількість клітин, які не на своєму місці)


    // const calculateHeuristic = (state) => {
    //     let misplacedTiles = 0;
    //     for (let i = 0; i < state.length; i++) {
    //         for (let j = 0; j < state[i].length; j++) {
    //             if (state[i][j] !== winArrBoxNumbers[i][j]) {
    //                 misplacedTiles++;
    //             }
    //         }
    //     }
    //     console.log(misplacedTiles);
    //     return misplacedTiles;
    // };

    const calculateHeuristic = (state) => {  // Функція для розрахунку евристичної відстані (сума шляхів клітин що не на місці до місця де маєть бути)
        let totalDistance = 0;

        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state[i].length; j++) {
                const currentTile = state[i][j];
                if (currentTile !== '') {                // Перевіряємо, чи клітина не є порожньою
                    for (let m = 0; m < state.length; m++) {
                        for (let n = 0; n < state[m].length; n++) {
                            if (currentTile === winArrBoxNumbers[m][n]) {           // Знаходимо координати цільової клітини
                                totalDistance += Math.abs(i - m) + Math.abs(j - n);         // Додавання модулів різниць координат
                            }
                        }
                    }
                } else {                                                      // Обробляємо порожню клітину
                    const targetI = state.length - 1;                         // Останній рядок
                    const targetJ = state[i].length - 1;                      // Останній стовпець
                    totalDistance += Math.abs(i - targetI) + Math.abs(j - targetJ); // Додавання модулів різниць координат
                }
            }
        }
        return totalDistance;
    };
   
    const isGoalState = (state) => {                          // Перевірка, чи поточний стан є цільовим
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state[i].length; j++) {
                if (state[i][j] !== winArrBoxNumbers[i][j]) {
                    return false;
                }
            }
        }
        return true;
    };
  
    const generatePossibleMoves = (state) => {                   // Генерує всі можливі ходи для даного стану
        const possibleMoves = [];      
        let emptyCellCoord;                                     // Знаходимо координати порожньої клітинки
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state[i].length; j++) {
                if (state[i][j] === '') {
                    emptyCellCoord = { i, j };
                    break;
                }
            }
        }
      
        const possibleMoveCoords = [];                                 // Знаходимо координати усіх можливих ходів
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
     
        for (const coord of possibleMoveCoords) {                    // Генеруємо новий стан поля для кожного доступного ходу   
            const newBoardState = state.map(row => [...row]); // Для копіювання масиву
            const temp = newBoardState[emptyCellCoord.i][emptyCellCoord.j];
            newBoardState[emptyCellCoord.i][emptyCellCoord.j] = newBoardState[coord.i][coord.j];
            newBoardState[coord.i][coord.j] = temp;
            possibleMoves.push(newBoardState);
        }
        return possibleMoves;
    };
   
    const isStateInList = (state, list) => {                        // Перевіряє, чи даний стан вже є у списку вузлів
        for (let i = 0; i < list.length; i++) {
            if (compareStates(list[i].state, state)) {
                return true;
            }
        }
        return false;
    };
  
    const compareStates = (state1, state2) => {                     // Порівнює два стани поля
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
        while (currentNode !== null) {                  // Продовжуємо переходити до батьківського вузла, поки не досягнемо початкового вузла
            path.unshift(currentNode.state);            // Додаємо стан вузла в початок шляху
            currentNode = currentNode.parent;           // Переходимо до батьківського вузла
        }
        return path;
    };

    const handleAIPlayClick = () => {
        if (!isGameStarted) {
            setMessage("Mix to start");
            return;
        }
        setDisableAiBtn(true);
        setMessage("AI thinking...");
        setTimeout(() => {
            const solvedTrack = aStarSearch();
            if (!solvedTrack) {
                setMessage("No solution found!.")
                setDisableAiBtn(false);                    // Потрібно встановити знову, якщо пошук не вдалося
                return;
            }
            setMessage("AI moving...");           
            const pathToGoal = reconstructPath(solvedTrack);    // шлях від цільового вузла до початкового вузла          
            let index = 0;
            const interval = setInterval(() => {                  // Прохід по кожному стану шляху з інтервалом
                if (index < pathToGoal.length) {
                    const state = pathToGoal[index];
                    setArrBoxNumbers(state);
                    dispatch(updateClickCount(index));
                    if (soundOn) { playSound(soundNames.makeMove); }
                    index++;
                } else {
                    clearInterval(interval);
                    setDisableAiBtn(false);
                }
            }, 500);
        }, 100);                                   // Затримка перед викликом aStarSearch для відпрацювання setDisableAiBtn(true);
    }




    //////////////////////////////////////////////////////////////////////////


    return (
        <main>
            <div className="container">
                <div className='message'>{message}</div>
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
                    <Button disabled={disableMixBtn} onClick={handleResortClick}>
                        {disableMixBtn && (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"

                            />
                        )} Mix
                    </Button>
                    <Button style={{ padding: '6px 5px' }} disabled={disableAiBtn || disableMixBtn} onClick={handleAIPlayClick}>
                        {disableAiBtn && (
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        )}
                        AI Play
                    </Button>
                </div>
            </div>
        </main>
    );
};

export default App;


