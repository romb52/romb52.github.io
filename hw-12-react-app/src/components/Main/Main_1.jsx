import { useReducer } from 'react';
import { Button } from 'react-bootstrap';
// action - об'єкт з одним обов'язковим полем 'type', друге поле 'payload' - необов'язкове - данні для роботи зі state
const reducer = (state, action) => {
  console.log(action);

  const { type, payload } = action;
  // switch (type) {
  //   case 'minus':
  //     return state - payload;
  //   case 'plus':
  //     return state + payload;
  //   default:
  //     return state;
  // }

  if (type === 'minus') {
    return state - payload;
  }

  if (type === 'plus') {
    return state + payload;
  }

  if (type === 'div') {
    return state / payload;
  }

  if (type === 'multy') {
    return state * payload;
  }

  return state;
};
export default function Main() {
  const [state, dispatch] = useReducer(reducer, 0);

  
  return (
    <section>
      <div className='container my-5'>
        <div className='d-flex gap-3'>
          <Button onClick={() => dispatch({ type: 'div', payload: 5 })}>
            /
          </Button>
          <Button onClick={() => dispatch({ type: 'minus', payload: 2 })}>
            -
          </Button>
          <span>{state}</span>
          <Button onClick={() => dispatch({ type: 'plus', payload: 4 })}>
            +
          </Button>
          <Button onClick={() => dispatch({ type: 'multy', payload: 3 })}>
            *
          </Button>
        </div>
      </div>
    </section>
  );
}
