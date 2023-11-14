import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import styles from '../Main/Main.module.css';

export default function Auth({ isLogin, changeAuth }) {
  const url = isLogin
    ? 'https://nest-try-app.onrender.com/users/login'
    : 'https://nest-try-app.onrender.com/users';
  const [isLoadData, setIsLoadData] = useState(false);
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
    }, 3000);
  };
  const sumbitForm = async (e) => {
    e.preventDefault();

    setCountClick(countClick + 1);

    if (refCountClick.current >= 1) {
      changeMessage('Ви вже відправили свої данні');
    } else {
      setIsLoadData(true);
      const res = await axios.post(url, {
        user: { ...form },
      });

      console.log(res.data);
      const { token } = res.data.user;
      if (token) {
        setIsLoadData(false);
        localStorage.setItem('token', token);
        changeAuth(true);
      }
      changeMessage('Дані відправлені');
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
        <p className={`${countClick <= 1 ? styles.success : styles.warning}`}>
          {message}
        </p>
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
              onKeyPress={(e) => handleKeyPress(e, refEmailInput)}
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
            onKeyPress={(e) => handleKeyPress(e, refPassInput)}
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
            onKeyPress={(e) => handleKeyPress(e, refBtnInput)}
          />
        </Form.Group>

        <Button variant='primary' type='submit' ref={refBtnInput}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
