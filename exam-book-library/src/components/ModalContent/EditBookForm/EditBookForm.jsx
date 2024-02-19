import { Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { updateBook, removeBook } from '../../../share/reducers/books.reducer';

export default function EditBookForm({ bookId }) {
  const books = useSelector(state => state.books.books);
  const book = books.find((item) => item.id === bookId);
  const initialForm = { title: '', author: '', publicationYear: 0, publisher: '', pageCount: 0,  copiesAvailable: 0 };
  const dispatch = useDispatch();
  const [form, setForm] = useState({ ...book });
  const [changedId, setChangedId] = useState(bookId);


  // const changeBook = (id) => {
  //   setChangedId(id);
  //   const book = books.find((item) => item.id === id);
  //   if (book) {
  //     setForm({ ...book });
  //   } else {
  //     setChangedId(0);
  //   }
  // };

  const changeInput = (e) => {
    console.log(e.target.name, e.target.value)
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const submiEditBook = (e) => {
    e.preventDefault();
    console.log(form)
    dispatch(updateBook({ ...form, id: changedId }));
    setForm(initialForm);
    setChangedId(0);
  };

  const deleteBook = (id) =>{
   if(id){
    dispatch(removeBook(id));
    setForm(initialForm);
  }
  };

  return (
    <>
      <h2>Edit book</h2>

      <Form className='d-flex flex-column gap-1 mb-2' onSubmit={(e) => submiEditBook(e)}>
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
          Edit book
        </Button>
        <Button
          variant='danger'
          onClick={() => deleteBook(book.id)}
        >
          Delete book
        </Button>

      </Form>
    </>
  );
}