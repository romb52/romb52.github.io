import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addBook } from '../../../share/reducers/books.reducer';
import styles from './AddBookForm.module.css';

export default function AddBookForm() {
  const initialForm = { title: '', author: '', publicationYear: 0, publisher: '', pageCount: 0,  copiesAvailable: 0 };
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialForm);

  const changeInput = (e) => {
    //console.log(e.target.name, e.target.value)
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const submitAddBook = (e) => {
    //console.log(form)
    e.preventDefault();
    const id = Date.now();
    dispatch(addBook({ ...form, id }));
    setForm(initialForm);   
  };

  return (
    <>
      <h2 className={styles.title}>Add book</h2>

      <Form className='d-flex flex-column gap-1 mb-2' onSubmit={(e) => submitAddBook(e)}>
        <Form.Group className='mb-3' controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            placeholder='Title'
            name='title'
            value={form.title}
            onChange={(e) => changeInput(e)}
            required 
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='author'>
          <Form.Label>Author</Form.Label>
          <Form.Control
            placeholder='Author'
            value={form.author}
            name='author'
            onChange={(e) => changeInput(e)}
            required 
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='title'>
          <Form.Label>Publication year</Form.Label>
          <Form.Control
            type='number'
            placeholder='Publication year'
            name='publicationYear'
            value={form.publicationYear}
            onChange={(e) => changeInput(e)}
            min={0}
            required 
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='title'>
          <Form.Label>Publisher</Form.Label>
          <Form.Control
            placeholder='Publisher'
            name='publisher'
            value={form.publisher}
            onChange={(e) => changeInput(e)}
            required 
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='title'>
          <Form.Label>Page count</Form.Label>
          <Form.Control
            type='number'
            placeholder='Page count'
            name='pageCount'
            value={form.pageCount}
            onChange={(e) => changeInput(e)}
            min={0}
            required 
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='count'>
          <Form.Label>Count</Form.Label>
          <Form.Control
            type='number'
            value={form.copiesAvailable}
            placeholder='count'
            name='copiesAvailable'
            onChange={(e) => changeInput(e)}
            min={0}
            required 
          />
        </Form.Group>

        <Button className='my-3' variant='primary' type='submit'>
         Add book
        </Button>

      </Form>
    </>
  );
}