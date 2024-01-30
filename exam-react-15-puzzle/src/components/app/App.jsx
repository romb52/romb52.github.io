import React, { useEffect, useState } from 'react';

const App = () => {
  const [arrBoxNumbers, setArrBoxNumbers] = useState([]);
  const [winArrBoxNumbers, setWinArrBoxNumbers] = useState([]);
  const [emptyCell_i, setEmptyCell_i] = useState(3);
  const [emptyCell_j, setEmptyCell_j] = useState(3);

  // const updateEmptyCellCoordinates = () => {
  //   if (arrBoxNumbers.length > 0) {
  //     for (let i = 0; i < 4; i++) {
  //       for (let j = 0; j < 4; j++) {
  //         if (arrBoxNumbers[i][j] === '') {
  //           setEmptyCell_i(i);
  //           setEmptyCell_j(j);
  //           return;
  //         }
  //       }
  //     }
  //   }
  // };

  const createTableCell = (i, j, content) => (
    <td key={`${i}${j}`} onClick={() => cellOnclick(i, j)}>
      {content}
    </td>
  );

  const cellOnclick = (i, j) => {
    if (
      (i === emptyCell_i && (j - emptyCell_j === 1 || j - emptyCell_j === -1)) ||
      (j === emptyCell_j && (i - emptyCell_i === 1 || i - emptyCell_i === -1))
    ) {
      setArrBoxNumbers((prevNumbers) => {
        const newNumbers = prevNumbers.map((row) => [...row]); // Deep copy the array
        newNumbers[emptyCell_i][emptyCell_j] = newNumbers[i][j];
        newNumbers[i][j] = '';
        return newNumbers;
      });
      setEmptyCell_i(i);
      setEmptyCell_j(j);
    }

    // Check for the winning condition
    //const winCheck = arrBoxNumbers.flat().every((value, index) => value === winArrBoxNumbers.flat()[index]);
    console.log({arrBoxNumbers})
    // if (winCheck) {
    //   setTimeout(() => alert('Win combo!!!!'), 300);
    // }
  };

  const Game = () => {
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

  useEffect(() => {
    Game();
  }, []);

  const handleResetClick = () => {
    Game();
  };

  return (
    <div>
      <table>
        <tbody>
          {arrBoxNumbers.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => createTableCell(i, j, cell))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleResetClick}>Reset</button>
      <button>Resort</button>
    </div>
  );
};

export default App;