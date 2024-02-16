
import { withLayout } from '../../components/Main/Main';

import { useReducer, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { books } from '../../share/data';
import Arrows from '../../components/Arrows/Arrows';

import { reducer } from '../../share/reducer';


import styles from './Books.module.css';


const initialForm = { title: '', author: '', count: 1 };
function Books() {

  const [state, dispatch] = useReducer(reducer, books);
  const [form, setForm] = useState(initialForm);
  const [changedId, setChangedId] = useState(0);

  const [sortColumn, setSortColumn] = useState('');
  const [isAZ, setIsAZ] = useState(true);

  const [currentPage, setCurrentPage] = useState(1); 
  const booksPerPage = 5; 

  const changeInput = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = state.slice(indexOfFirstBook, indexOfLastBook);

  const sumbit = (e) => {
    e.preventDefault();
    const id = Date.now();

    if (changedId === 0) {
      const payload = { ...form, id };
      dispatch({ type: 'new_book', payload });
      setForm(initialForm);   
    } else {
      const payload = { ...form, id: changedId };
      dispatch({ type: 'change_book', payload });
      setForm(initialForm);  
      setChangedId(0);
    }
  };

  const changeBook = (id) => {
    setChangedId(id);
    const book = state.find((item) => item.id === id);
    if (book) {
      setForm({ ...book });
    } else {
      setChangedId(0);
    }
  };

  const changeSort = (isAZ, name) => {
    setSortColumn(() => name);
    setIsAZ(() => isAZ);
    dispatch({
      type: 'sort',
      payload: { isAZ, name, isNumber: name === 'count' ? true : false },
    });
  };

  const getTotalCount = () => {
    return state.reduce((total, book) => total + parseInt(book.count), 0);
  };


  return (
    <section>
      <div className='container'>

      <Form className='d-flex gap-5 mb-5' onSubmit={(e) => sumbit(e)}>
          <Form.Group className='mb-3' controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder='Title'
              name='title'
              value={form.title}
              onChange={(e) => changeInput(e)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='author'>
            <Form.Label>Author</Form.Label>
            <Form.Control
              placeholder='Author'
              value={form.author}
              name='author'
              onChange={(e) => changeInput(e)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='count'>
            <Form.Label>Count</Form.Label>
            <Form.Control
              type='number'
              value={form.count}
              placeholder='count'
              name='count'
              onChange={(e) => changeInput(e)}
            />
          </Form.Group>

          <Button className='my-3' variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
        <div className={styles.grid}>
          <div key='head-book' className={styles.item}>
            <p>#</p>
            <p>
              Title
              <Arrows
                name='title'
                changeSort={changeSort}
                isAZ={isAZ}
                sortColumn={sortColumn}
              />
            </p>
            <p>
              Author
              <Arrows
                name='author'
                changeSort={changeSort}
                isAZ={isAZ}
                sortColumn={sortColumn}
              />
            </p>
            <p>
              Count
              <Arrows
                name='count'
                changeSort={changeSort}
                isAZ={isAZ}
                sortColumn={sortColumn}
              />
            </p>
            <p>Delete</p>
            <p>Add</p>
            <p>Minus</p>
            <p>Change</p>
          </div>
          {currentBooks.map((book, i) => (
            <div key={book.id} className={styles.item}>
              <p>{indexOfFirstBook + i + 1}</p>
              <p>{book.title}</p>
              <p>{book.author}</p>
              <p>{book.count}</p>
              <Button
                variant='danger'
                onClick={() => dispatch({ type: 'delete', payload: book.id })}
              >
                Del
              </Button>
              <Button
                variant='success'
                onClick={() => dispatch({ type: 'add', payload: book.id })}
              >
                Add
              </Button>
              <Button
                onClick={() => dispatch({ type: 'minus', payload: book.id })}
              >
                Minus
              </Button>

              <Button variant='warning' onClick={() => changeBook(book.id)}>
                Change
              </Button>
            </div>
          ))}
          <div key='foot-book' className={styles.item}>
            <p>#</p>
            <p></p>
            <p>Total count:</p>
            <p>{getTotalCount()}</p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
        </div>
        <div className={styles.pagination}>
          {state.length > booksPerPage && (
            <ul className='pagination'>
              {Array.from({ length: Math.ceil(state.length / booksPerPage) }).map((_, index) => (
                <li key={index} className='page-item'>
                  <button
                    className='page-link'
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
      </div>
    </section>
  );
}

export default withLayout(Books);
