import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAuth } from '../../share/api/auth.api';
import styles from './FormAuth.module.css';
import { useEffect } from 'react';
import { clearErrors } from '../../share/reducers/errors.reducer';

export default function FormAuth({ title, link, titleLink, isSignUp }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const initalState = isSignUp
    ? { email: '', password: '', username: '' }
    : { email: '', password: '' };
    
  const [formData, setFormData] = useState(initalState);
  const [message, setMessage] = useState('');
  const error = useSelector((state) => state.error);
  
  const handlerSubmit = async (e) => {
    e.preventDefault();
    const path = isSignUp ? '/users' : '/users/login';
    await dispatch(fetchAuth({ body: formData, path }));
  };
  const handlerChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (error.error) {
      console.log(error.error);
      if (error.error.body) {
        const arrErrors = error.error.body.map(item => item);
        const arrError = arrErrors.join('\n');
        console.log(arrError);
        setMessage(arrError);
      } else {
        setMessage(error.error);
        console.log(error.error);
      }
      setTimeout(() => {
        setMessage('');
        dispatch(clearErrors());
      }, 5000);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (token && token !== '') {
      navigate('/');
    }
  }, [token]);

  return (
    <div className={styles.wrap}>
      <div>
        <div>   {message !== '' && (
          <div className='text-danger'>
            {message.split('\n').map((msg, index) => (
              <p key={index} className=''>{msg}</p>
            ))}
          </div>
        )}</div>
        <Form
          className={styles.form}
          method='POST'
          onSubmit={(e) => handlerSubmit(e)}
        >
          <h1>{title}</h1>       
          <Link to={link}>{titleLink}</Link>
          {isSignUp && (
            <Form.Group className='mb-3' controlId='username'>
              <Form.Label>User Name</Form.Label>
              <Form.Control
                name='username'
                placeholder='User Name'
                onChange={(e) => handlerChange(e)}
              />
            </Form.Group>
          )}
          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='name@example.com'
              onChange={(e) => handlerChange(e)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='password'>
            <Form.Label>password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              placeholder='password'
              onChange={(e) => handlerChange(e)}
            />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <div></div>
            <Button type='submit'>{title}</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
