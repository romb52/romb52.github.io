import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import styles from '../Main/Main.module.css';

export default function Auth({ isLogin, changeAuth }) {
  const url = isLogin
    ? 'https://nest-try-app.onrender.com/users/login'
    : 'https://nest-try-app.onrender.com/users';
  const [isLoadData, setIsLoadData] = useState(false);
  const[isError, setIsError]= useState(false);
  const [message, setMessage] = useState('');
  const [countClick, setCountClick] = useState(0);
  const refCountClick = useRef(0);

  const refLoginInput = useRef(null);
  const refEmailInput = useRef(null);
  const refPassInput = useRef(null);
  const refBtnInput = useRef(null);

  const [form, setForm] = useState(null);

  const changeInputData = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const changeMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };
  const sumbitForm = async (e) => {
    e.preventDefault();

    setCountClick(countClick + 1);

    if (refCountClick.current >= 1) {
      changeMessage('Ви вже відправили свої данні');
    } else {
      setIsLoadData(true);

      try {
        const res = await axios.post(url, {
          user: { ...form },
        });

        console.log(res.data);
        const { token } = res.data.user;
        const { username } = res.data.user;

        if (token) {
          setIsLoadData(false);
          setIsError(false);
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
          changeAuth(true);
          changeMessage('Дані відправлені');
        }
      } catch (error) {
        setIsLoadData(false);
        setIsError(true);
        if (error.response) {
          const { status, data } = error.response;
          console.log(status, data);         
          if (status === 404 || status === 422 && data.statusCode === 422) {
            console.error(' Error:', data.message);
            changeMessage(data.message);
          } else if (status === 422 && data.errors) {
            console.error(' Error:', data.errors.body);
            const arrErrors = data.errors.body.map(item => item)
            const arrError = arrErrors.join('\n');
            changeMessage(arrError);
          }
        }
        else {         
          console.error('Request Error:', error.message);
          changeMessage('Непередбачена помилка. Спробуйте ще раз.');
        }
      }
    }
  };

  const handleKeyPress = (event, nextInput) => {
    if (event.key === 'Enter') {
      nextInput.current.focus();
    }
  };

  useEffect(() => {
    //console.log(refLoginInput)
    if (refLoginInput.current) {
      refLoginInput.current.focus();
    }
  }, [refLoginInput]);

  useEffect(() => {
    refCountClick.current = countClick;
  }, [countClick]);

  return (
    <div className='container mt-5'>
      {isLoadData && <Spinner animation='grow' variant='primary' />}
      {message !== '' && (
        <div className={`${countClick <= 1 ? styles.success : styles.warning}`}>
           {message.split('\n').map((msg, index) => (
    <p key={index}className={isError ? styles.warning : ''}>{msg}</p>
  ))}
        </div>
      )}
      {isLogin ? <h1>Login</h1> : <h1>Registration</h1>}
      <Form onSubmit={(e) => sumbitForm(e)} method='POST'>
        {!isLogin && (
          <Form.Group className='mb-3' controlId='username'>
            <Form.Label>Your login</Form.Label>
            <Form.Control
              placeholder='Enter login'
              name='username'
              onChange={(e) => changeInputData(e)}
              ref={refLoginInput}
              onKeyUp={(e) => handleKeyPress(e, refEmailInput)}
            />
          </Form.Group>
        )}

        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            name='email'
            onChange={(e) => changeInputData(e)}
            ref={refEmailInput}
            onKeyUp={(e) => handleKeyPress(e, refPassInput)}
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            ref={refPassInput}
            onChange={(e) => changeInputData(e)}
            onKeyUp={(e) => handleKeyPress(e, refBtnInput)}
          />
        </Form.Group>

        <Button variant='primary' type='submit' ref={refBtnInput}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
