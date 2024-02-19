
import { withLayout } from '../../components/Main/Main';
//import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { addBook, removeBook, updateBook, sortBooks, filterBooks, unsortedBooks } from '../../share/reducers/books.reducer';
import { MdEdit } from "react-icons/md";
import Modal from '../../components/modal/Modal';
import AddBookForm from '../../components/ModalContent/AddBookForm/AddBookForm';
import EditBookForm from '../../components/ModalContent/EditBookForm/EditBookForm';



import styles from './Books.module.css';


// const initialForm = { title: '', author: '', count: 1 };

function Books() {

  const books = useSelector(state => state.books.books);
  const filteredBooks = useSelector(state => state.books.filteredBooks);
  const dispatch = useDispatch();
  // const [form, setForm] = useState(initialForm);
  // const [changedId, setChangedId] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // const [sortColumn, setSortColumn] = useState('');
  // const [isAZ, setIsAZ] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  const [sortField, setSortField] = useState(''); // Стан для зберігання вибраного поля сортування
  //const [sortDirection, setSortDirection] = useState(true); // Стан для зберігання напрямку сортування

  const [searchQuery, setSearchQuery] = useState(''); // Стан для зберігання пошукового запиту

  // const changeInput = (e) => {
  //   console.log(e.target.name, e.target.value)
  //   setForm((prev) => {
  //     return { ...prev, [e.target.name]: e.target.value };
  //   });
  // };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const currentFilteredBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // const sumbit = (e) => {
  //   e.preventDefault();
  //   const id = Date.now();

  //   if (changedId === 0) {
  //     dispatch(addBook({ ...form, id }));
  //     setForm(initialForm);
  //   } else {
  //     dispatch(updateBook({ ...form, id: changedId }));
  //     setForm(initialForm);
  //     setChangedId(0);
  //   }
  // };
  
  // const submitAddBook = (e) => {
  //   console.log(form)
  //   e.preventDefault();
  //   const id = Date.now();    
  //     dispatch(addBook({ ...form, id }));
  //     setForm(initialForm);       
  // };

  // const changeBook = (id) => {
  //   setChangedId(id);
  //   const book = books.find((item) => item.id === id);
  //   if (book) {
  //     setForm({ ...book });
  //   } else {
  //     setChangedId(0);
  //   }
  // };

  // const getTotalCount = () => {
  //   return filteredBooks.length > 0 ? filteredBooks.reduce((total, book) => total + parseInt(book.count), 0) : books.reduce((total, book) => total + parseInt(book.count), 0);
  // };

  const sortChange = (e) => {
    setSortField(e.target.value); // Оновлення поля сортування при зміні вибору
  };

  const submitSort = (e) => {
    e.preventDefault();
    dispatch(sortBooks({ field: sortField, isNumber: sortField === 'copiesAvailable' }));
  };

  const searchInput = (e) => {
    setSearchQuery(e.target.value); // Оновлення пошукового запиту при введенні користувачем
  };

  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(filterBooks(searchQuery)); // Викликаємо дію для фільтрації книг з введеним пошуковим запитом
    setSearchQuery('');
  };

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen((prev) => !prev);
  };


  return (
    <section>
      <div className='container'>

        <div className={`d-flex justify-content-between ${styles.titlewrap}`}>
          <h2>ALL BOOKS:</h2>
          <Button onClick={() => openModal(<AddBookForm />)}>New book</Button>
        </div>

        <Modal isModalOpen={isModalOpen} openModal={openModal}>
          {modalContent}
        </Modal>


        <div className='row justify-content-between'>
          <div className="col-5 pe-1">
            <Form className='d-flex gap-2 mb-1 align-items-center' onSubmit={(e) => submitSort(e)}>
              <Form.Label style={{ width: "80px" }}>Sort by:</Form.Label>
              <Form.Select value={sortField} onChange={sortChange}>
                <option value="author">author</option>
                <option value="title">title</option>
                <option value="copiesAvailable">count</option>
              </Form.Select>
              <Button className='my-3' variant='primary' type='submit'>
                Sort
              </Button>
            </Form>
          </div>
          <div className='col-5 ps-1'>
            <Form className='d-flex gap-2 mb-1 align-items-center' onSubmit={(e) => submitSearch(e)}>
              <Form.Label>Search:</Form.Label>
              <Form.Control
                name='search'
                value={searchQuery}
                onChange={(e) => searchInput(e)}
              />
              <Button className='my-3' variant='primary' type='submit'>
                Search
              </Button>
            </Form>
          </div>
        </div>


        {/* <Form className='d-flex gap-5 mb-5' onSubmit={(e) => sumbit(e)}>
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
              value={form.copiesAvailable}
              placeholder='count'
              name='count'
              onChange={(e) => changeInput(e)}
            />
          </Form.Group>

          <Button className='my-3' variant='primary' type='submit'>
            Submit
          </Button>

        </Form> */}

        <div className={styles.grid}>
          <div key='head-book' className={`${styles.item} ${styles.tableTitle}`}>
            <p>#</p>
            <p>
              Title
            </p>
            <p>
              Author
            </p>
            <p>
              Publication year
            </p>
            <p>
              Publisher
            </p>
            <p>
              Page count
            </p>
            <p>
              Copies available
            </p>
            <p>Edit</p>
          </div>

          {filteredBooks.length > 0 ? currentFilteredBooks.map((book, i) => (
            <div key={book.id} className={styles.item}>
              <p>{indexOfFirstBook + i + 1}</p>
              <p>{book.title}</p>
              <p>{book.author}</p>
              <p>{book.publicationYear}</p>
              <p>{book.publisher}</p>
              <p>{book.pageCount}</p>
              <p>{book.copiesAvailable}</p>
              {/* <Button
                variant='danger'
                onClick={() => dispatch(removeBook(book.id))}
              >
                Del
              </Button>
              <Button
                variant='success'
                onClick={() => dispatch(increaseBookCount({ id: book.id }))}
              >
                Add
              </Button>
              <Button
                onClick={() => dispatch(decreaseBookCount({ id: book.id }))}
              >
                Minus
              </Button> */}

              <Button variant='warning'
                // onClick={() => changeBook(book.id)}
                onClick={() => openModal(<EditBookForm bookId={book.id}/>)}>
                <MdEdit size={24} />
              </Button>
            </div>

          )) : currentBooks.map((book, i) => (
            <div key={book.id} className={styles.item}>
              <p>{indexOfFirstBook + i + 1}</p>
              <p>{book.title}</p>
              <p>{book.author}</p>
              <p>{book.publicationYear}</p>
              <p>{book.publisher}</p>
              <p>{book.pageCount}</p>
              <p>{book.copiesAvailable}</p>
              {/* <Button
                variant='danger'
                onClick={() => dispatch(removeBook(book.id))}
              >
                Del
              </Button>
              <Button
                variant='success'
                onClick={() => dispatch(increaseBookCount({ id: book.id }))}
              >
                Add
              </Button>
              <Button
                onClick={() => dispatch(decreaseBookCount({ id: book.id }))}
              >
                Minus
              </Button> */}

              <Button variant='warning'
                // onClick={() => changeBook(book.id)}
                onClick={() => openModal(<EditBookForm bookId={book.id} setIsModalOpen={setIsModalOpen}/>)}>
                <MdEdit size={24} />
              </Button>
            </div>
          ))}


          {/* <div key='foot-book' className={styles.item}>
            <p>#</p>
            <p></p>
            <p>Total count:</p>
            <p>{getTotalCount()}</p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div> */}
        </div>

        {filteredBooks.length > 0 ? (
          <div className={styles.pagination}>
            <ul className='pagination'>
              {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }).map((_, index) => (
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
          </div>
        ) : (
          <div className={styles.pagination}>
            <ul className='pagination'>
              {Array.from({ length: Math.ceil(books.length / booksPerPage) }).map((_, index) => (
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
          </div>
        )}

        {filteredBooks.length > 0 && <Button onClick={() => dispatch(unsortedBooks())}>To all books...</Button>}

      </div>
    </section>
  );
}

export default withLayout(Books);
