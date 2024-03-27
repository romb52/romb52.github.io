import { Button, Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { updateBook, removeBook } from '../../../share/reducers/books.reducer';
import styles from '../AddBookForm/AddBookForm.module.css';

export default function EditBookForm({ bookId, setIsModalOpen, openModal }) {
  const books = useSelector(state => state.books.books);
  const book = books.find((item) => item.id === bookId);
  const initialForm = { title: '', author: '', publicationYear: 0, publisher: '', pageCount: 0, copiesAvailable: 0 };
  const dispatch = useDispatch();
  const [form, setForm] = useState({ ...book });
  const [changedId, setChangedId] = useState(bookId);

  useEffect(() => {
    setForm({ ...book });
    setChangedId(bookId);
  }, [bookId]);

  const changeInput = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const submiEditBook = (e) => {
    e.preventDefault();
    dispatch(updateBook({ ...form, id: changedId }));
    setIsModalOpen(false); // Закриття модального вікна після редагування книги
  };

  const deleteBook = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this book?'); // Відображення підтвердження браузера

    if (isConfirmed) {
      dispatch(removeBook(id));
      setForm(initialForm);
      setIsModalOpen(false); // Закриття модального вікна після видалення книги
    }
  };

  return (
    <>
      <h2 className={styles.title}>Edit book</h2>

      <Form className='d-flex flex-column gap-1 mb-2' onSubmit={(e) => submiEditBook(e)}>
        
        <FloatingLabel
          controlId="title"
          label="Title"
          className="mb-3"
        >
          <Form.Control
            placeholder='Title'
            name='title'
            value={form.title}
            onChange={(e) => changeInput(e)}
            required
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="author"
          label="Author"
          className="mb-3"
        >
          <Form.Control
            placeholder='Author'
            value={form.author}
            name='author'
            onChange={(e) => changeInput(e)}
            required
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="publicationYear"
          label="Publication year"
          className="mb-3"
        >
          <Form.Control
            type='number'
            placeholder='Publication year'
            name='publicationYear'
            value={form.publicationYear}
            onChange={(e) => changeInput(e)}
            min={0}
            required
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="publisher"
          label="Publisher"
          className="mb-3"
        >
          <Form.Control
            placeholder='Publisher'
            name='publisher'
            value={form.publisher}
            onChange={(e) => changeInput(e)}
            required
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="pageCount"
          label="Page count"
          className="mb-3"
        >
          <Form.Control
            type='number'
            placeholder='Page count'
            name='pageCount'
            value={form.pageCount}
            onChange={(e) => changeInput(e)}
            min={0}
            required
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="copiesAvailable"
          label="Count"
          className="mb-3"
        >
          <Form.Control
            type='number'
            value={form.copiesAvailable}
            placeholder='count'
            name='copiesAvailable'
            onChange={(e) => changeInput(e)}
            min={0}
            required
          />
        </FloatingLabel>
        
        <Button className='d-flex  justify-content-center align-items-center'
          variant='danger'
          onClick={() => deleteBook(book.id)}
        >
          <MdDelete size={18}/>
          DELETE BOOK
        </Button>

        <div className='modalContentBtnGroup'>
          <Button className='modalContentBtn me-2 ' variant='outline-secondary' onClick={() => openModal()}>
            CANCEL
          </Button>

          <Button className='modalContentBtn ' variant='primary' type='submit'>
            EDIT BOOK
          </Button>
        </div>

      </Form>
    </>
  );
}