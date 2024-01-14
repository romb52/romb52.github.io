import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAuth } from '../../share/api/auth.api';
import styles from './FormAuth.module.css';

export default function FormAuth({ title, link, titleLink, isSignUp }) {
  const initalState = isSignUp
    ? { email: '', password: '', username: '' }
    : { email: '', password: '' };
  const [formData, setFormData] = useState(initalState);
  const dispatch = useDispatch();
  const handlerSubmit = (e) => {
    console.log('aaa');
    e.preventDefault();
    const path = isSignUp ? '/users' : '/users/login';
    dispatch(fetchAuth({ body: formData, path }));
  };
  const handlerChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className={styles.wrap}>
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
        <Button type='submit'>{title}</Button>
      </Form>
    </div>
  );
}
