import { useReducer } from 'react';
import { Button } from 'react-bootstrap';
// action - об'єкт з одним обов'язковим полем 'type', друге поле 'payload' - необов'язкове - данні для роботи зі state
const reducerAuth = (state, action) => {
  console.log(action);

  const { type, payload } = action;
  if (type === 'logout') {
    return null;
  }
  if (type === 'login') {
    return {...state, login: payload.login};
  }
  return state;
};

const reducer1 = (state, action) => {
  console.log(action)
  return state;
};
export default function Main() {
  const [state, dispatch] = useReducer(reducerAuth, null);
  const [state1, dispatch1] = useReducer(reducer1, null);

  return (
    <section>
      <div className='container my-5'>
        <div className='d-flex gap-3'>
          <Button onClick={() => dispatch({ type: 'logout' })}>logout</Button>
          <span>{state && state.login ? state.login : 'not auth'}</span>
          <Button
            onClick={() =>
              dispatch({ type: 'login', payload: { login: 'user' } })
            }
          >
            login
          </Button>
          <Button
            onClick={() =>
              dispatch1({ type: 'login1', payload: { login: 'user' } })
            }
          >
            login1
          </Button>
        </div>
      </div>
    </section>
  );
}
