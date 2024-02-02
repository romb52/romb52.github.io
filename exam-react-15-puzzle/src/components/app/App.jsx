import React, { useEffect, useState } from 'react';

const App = () => {
  const shuffleMaxCount = 10; // Максимальна кількість кроків перемішування
  let timer;

  const [arrBoxNumbers, setArrBoxNumbers] = useState([]);               // збереження номерів клітинок на полі гри
  const [winArrBoxNumbers, setWinArrBoxNumbers] = useState([]);         // збереження номерів клітинок для виграшу
  const [emptyCell_i, setEmptyCell_i] = useState(3);                    // збереження порожньої клітинки по горизонталі
  const [emptyCell_j, setEmptyCell_j] = useState(3);                    // збереження порожньої клітинки по вертикалі
  const [previousCord, setPreviousCord] = useState({ i: -1, j: -1 });   // збереження попередньої клітинки 


  useEffect(() => {                     // Ефект для перевірки умови виграшу при зміні стану arrBoxNumbers або winArrBoxNumbers   
    const winCheck = arrBoxNumbers.flat().every((value, index) => value === winArrBoxNumbers.flat()[index]);
    //console.log({ arrBoxNumbers });
    if (winCheck) {
      //setTimeout(() => alert('Win combo!!!!'), 300);
    }
  }, [arrBoxNumbers, winArrBoxNumbers]);

  useEffect(() => {                  // Ефект для ініціалізації гри при завантаженні компонента
    Game();
  }, []);

  const createTableCell = (i, j, content) => (                          // Функція для створення HTML-коду для клітинки таблиці              
    <td key={`${i}${j}`} onClick={() => cellOnclick(i, j)}>
      {content}
    </td>
  );

  const cellOnclick = (i, j) => {                                        // Функція, яка відповідає за клік по клітинці
    if (
      (i === emptyCell_i && (j - emptyCell_j === 1 || j - emptyCell_j === -1)) ||
      (j === emptyCell_j && (i - emptyCell_i === 1 || i - emptyCell_i === -1))
    ) {
      setArrBoxNumbers((prevNumbers) => {
        const newNumbers = prevNumbers.map((row) => [...row]);
        newNumbers[emptyCell_i][emptyCell_j] = newNumbers[i][j];
        newNumbers[i][j] = '';
        setEmptyCell_i(i);
        setEmptyCell_j(j);
        return newNumbers;
      });
    }
  };

  const Game = () => {                                   // Функція для ініціалізації гри
    const newNumbers = [];
    let emptyCell = { i: 3, j: 3 };

    for (let i = 0; i < 4; i++) {
      newNumbers[i] = [];
      for (let j = 0; j < 4; j++) {
        newNumbers[i][j] = i === 3 && j === 3 ? '' : i * 4 + j + 1;
        if (i === 3 && j === 3) {
          emptyCell = { i, j };
        }
      }
    }
    setEmptyCell_i(emptyCell.i);
    setEmptyCell_j(emptyCell.j);
    setWinArrBoxNumbers(newNumbers);
    setArrBoxNumbers(newNumbers);
  };


  const handleResetClick = () => {           // Функція для обробки кліку на кнопці "Reset"
    Game();
  };

  const handleResortClick = () => {                        // Функція для обробки кліку на кнопці "Перемішати"
    
    setArrBoxNumbers(shuffleArray(arrBoxNumbers));

    // let shuffleCount = 0;
    // if (shuffleCount === 0) {
    //   timer = setInterval(() => {       
    //     setArrBoxNumbers(shuffleArray(arrBoxNumbers));
    //     shuffleCount++;
    //     if (shuffleCount >= shuffleMaxCount) {
    //       console.log('clearInterval');
    //       clearInterval(timer);
    //     }
    //   }, 1000);
    // }

  };


  function shuffleArray(array) {                     // Функція для перемішування клітинок

    let arrValidCoord = [];       // Створення масиву з координатами клітинок, які можуть здійснити переміщення
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if ((i === emptyCell_i && ((j - emptyCell_j) === 1 || (j - emptyCell_j) === -1)) || (j === emptyCell_j && (i - emptyCell_i === 1 || i - emptyCell_i === -1))) {
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
    newArray[emptyCell_i][emptyCell_j] = newArray[oneRandomValidCoord.i][oneRandomValidCoord.j];
    newArray[oneRandomValidCoord.i][oneRandomValidCoord.j] = '';
  setPreviousCord({ i: emptyCell_i, j: emptyCell_j });        // Оновлення попередньої клітинки та порожньої клітинки
    setEmptyCell_i(oneRandomValidCoord.i);
    setEmptyCell_j(oneRandomValidCoord.j);
    console.log(newArray, previousCord, oneRandomValidCoord);
    return newArray;
  }


  return (
    <div>
      <div className="container">
        <table>
          <tbody>
            {arrBoxNumbers.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => createTableCell(i, j, cell))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="btn-wrap">
          <button onClick={handleResetClick}>Reset</button>
          <button onClick={handleResortClick}>Resort</button>
        </div>
      </div>
    </div>
  );
};

export default App;