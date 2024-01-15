import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAuth } from '../../share/api/auth.api';
import styles from './FormAuth.module.css';
import { setError, clearErrors } from '../../share/reducers/errors.reducer';

export default function FormAuth({ title, link, titleLink, isSignUp }) {
  const dispatch = useDispatch();

  const initalState = isSignUp
    ? { email: '', password: '', username: '' }
    : { email: '', password: '' };

  const [formData, setFormData] = useState(initalState);
  const [message, setMessage] = useState('');

  const error = useSelector((state) => state.error);

  const handlerSubmit = (e) => {
    e.preventDefault();
    const path = isSignUp ? '/users' : '/users/login';
    dispatch(fetchAuth({ body: formData, path }));
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

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
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
          <h1 className="d-flex justify-content-center">{title}</h1>
          <Link to={link} className="d-flex justify-content-center">{titleLink}</Link>
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
