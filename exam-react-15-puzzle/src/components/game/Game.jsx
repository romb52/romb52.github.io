import React, { useEffect, useState, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { updateGameTime, updateClickCount } from '../../share/reducers/game.reducer';

const App = () => {
    const dispatch = useDispatch();
    const gameTime = useSelector((state) => state.game.gameTime);
    const clickCount = useSelector((state) => state.game.clickCount);
    const boardSize = useSelector((state) => state.game.boardSize);
    //console.log(boardSize);
    const shuffleMaxCount = 50; // Максимальна кількість кроків перемішування
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
    }, [boardSize]);


    useEffect(() => {                     // Ефект для перевірки умови виграшу при зміні стану arrBoxNumbers або winArrBoxNumbers   
        const winCheck = arrBoxNumbers.flat().every((value, index) => value === winArrBoxNumbers.flat()[index]);
        //console.log({ arrBoxNumbers });
        if (winCheck && isGameStarted) {
            //setTimeout(() => alert('Win combo!!!!'), 300);
            console.log('Win combo!!!!');
            setIsGameStarted(false);
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
                }
            }, 200);

            return () => clearInterval(timer);
        }
    }, [shuffleCount]);

    const createTableCell = (i, j, content) => (                          // Функція для створення HTML-коду для клітинки таблиці              
        <td key={`${i}${j}`} onClick={() => cellOnclick(i, j)} data-attr={content === '' ? 'emptyCell' : null}>
            {content}
        </td>
    );

    const cellOnclick = (i, j) => {                                        // Функція, яка відповідає за клік по клітинці
        setIsGameStarted(true);
        dispatch(updateClickCount(clickCount + 1));
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
    };


    const handleResetClick = () => {           // Функція для обробки кліку на кнопці "Reset"
        Game();
        dispatch(updateClickCount(0));
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
                    <Button >Start</Button>
                    <Button disabled={disable} onClick={handleResortClick}>Resort</Button>
                </div>
            </div>
        </main>
    );
};

export default App;