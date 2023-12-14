import React, { useState } from 'react';
import ChildComponent from './components/ChildComponent';
import './App.css';

function App(): JSX.Element {
  const [count, setCount] = useState<number>(0);
  const changeFunc = (a: number): void => {
    if (a < 10) {
      setCount(count + 1);
    } else {
      setCount(count - 1);
    }
  }
  return (
    <div className="App">
      <h1>Hello</h1>
      <p>{count}</p>

      <ChildComponent changeFunc={changeFunc} count={count} />
    </div>
  );
}

export default App;
