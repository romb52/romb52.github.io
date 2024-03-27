
import { withLayout } from '../../components/Main/Main';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { sortBooks, filterBooks, unsortedBooks } from '../../share/reducers/books.reducer';
import { MdEdit } from "react-icons/md";
import { FaPlus, FaSortDown } from "react-icons/fa";
import { IoChevronBack, IoSearch } from "react-icons/io5";
import Modal from '../../components/modal/Modal';
import AddBookForm from '../../components/ModalContent/AddBookForm/AddBookForm';
import EditBookForm from '../../components/ModalContent/EditBookForm/EditBookForm';
import styles from './Books.module.css';


function Books() {

  const books = useSelector(state => state.books.books);                // Отримання списку книг та відфільтрованих книг зі стану
  const filteredBooks = useSelector(state => state.books.filteredBooks);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);                // Локальний стан для керування модальним вікном
  const [modalContent, setModalContent] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);                     // Стан для керування поточною сторінкою та кількістю книг на сторінці
  const booksPerPage = 7;

  const [sortField, setSortField] = useState('author'); // Стан для зберігання вибраного поля сортування


  const [searchQuery, setSearchQuery] = useState(''); // Стан для зберігання пошукового запиту

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const currentFilteredBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const sortChange = (e) => {
    setSortField(e.target.value); // Оновлення поля сортування при зміні вибору
  };

  const submitSort = (e) => {          // Вибір і сортування полів для сортування книг
    e.preventDefault();
    dispatch(sortBooks({ field: sortField, isNumber: sortField === 'copiesAvailable' }));
  };

  const searchInput = (e) => {
    setSearchQuery(e.target.value); // Оновлення пошукового запиту при введенні користувачем
  };

  const submitSearch = (e) => {         // Обробник подання пошукового запиту
    e.preventDefault();
    dispatch(filterBooks(searchQuery)); // Викликаємо дію для фільтрації книг з введеним пошуковим запитом
    setSearchQuery('');
  };

  const openModal = (content) => {         // Обробник відкриття модального вікна
    setModalContent(content);
    setIsModalOpen((prev) => !prev);
  };


  return (
    <section>
      <div className='container d-flex flex-column justify-content-between '>

        <div className={`d-flex justify-content-between ${styles.titlewrap}`}>
          <h2>ALL BOOKS:</h2>
          <Button className='d-flex gap-1 justify-content-center align-items-center' onClick={() => openModal(<AddBookForm />)}> <FaPlus /> New book</Button>
        </div>

        {/* Модальне вікно для додавання та редагування книг */}
        <Modal isModalOpen={isModalOpen} openModal={openModal}>
          {modalContent}
        </Modal>

        {/* Форми для сортування  */}
        <div className='row justify-content-between'>
          <div className="col-5 pe-1">
            <Form className='d-flex gap-2 mb-1 align-items-center' onSubmit={(e) => submitSort(e)}>
              <Form.Label style={{ whiteSpace: 'nowrap' }}>Sort by:</Form.Label>
              <Form.Select value={sortField} onChange={sortChange}>
                <option value="author">author</option>
                <option value="title">title</option>
                <option value="copiesAvailable">count</option>
              </Form.Select>
              <Button className='my-3 d-flex gap-1 align-items-center' variant='primary' type='submit'><FaSortDown />
                Sort
              </Button>
            </Form>
          </div>

          {/* Форми для пошуку */}
          <div className='col-5 ps-1'>
            <Form className='d-flex gap-2 mb-1 align-items-center' onSubmit={(e) => submitSearch(e)}>
              <Form.Label>Search:</Form.Label>
              <Form.Control
                name='search'
                value={searchQuery}
                onChange={(e) => searchInput(e)}
              />
              <Button className='my-3 d-flex gap-1 align-items-center' variant='primary' type='submit'><IoSearch />
                Search
              </Button>
            </Form>
          </div>
        </div>

        {/* Відображення списку книг */}
        <div className={styles.grid}>
          <div key='head-book' className={`${styles.item} ${styles.tableTitle}`}>
            <p>id</p>
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

          {/* Відображення відфільтрованих або всіх книг */}
          {filteredBooks.length > 0 ? currentFilteredBooks.map((book, i) => (
            <div key={book.id} className={styles.item}>
              <p>{indexOfFirstBook + i + 1}</p>
              <p>{book.title}</p>
              <p>{book.author}</p>
              <p className='justify-content-center'>{book.publicationYear}</p>
              <p className='justify-content-center text-center'>{book.publisher}</p>
              <p className='justify-content-center'>{book.pageCount}</p>
              <p className='justify-content-center'>{book.copiesAvailable}</p>

              <Button className='d-flex gap-1 justify-content-center align-items-center' variant="success"
                onClick={() => openModal(<EditBookForm bookId={book.id} />)}>
                <MdEdit size={18} />Edit
              </Button>
            </div>

          )) : currentBooks.map((book, i) => (
            <div key={book.id} className={styles.item}>
              <p>{indexOfFirstBook + i + 1}</p>
              <p>{book.title}</p>
              <p>{book.author}</p>
              <p className='justify-content-center'>{book.publicationYear}</p>
              <p className='justify-content-center text-center'>{book.publisher}</p>
              <p className='justify-content-center'>{book.pageCount}</p>
              <p className='justify-content-center'>{book.copiesAvailable}</p>

              <Button className='d-flex gap-1 justify-content-center align-items-center' variant="success"
                onClick={() => openModal(<EditBookForm bookId={book.id} setIsModalOpen={setIsModalOpen} />)}>
                <MdEdit size={18} />Edit
              </Button>
            </div>
          ))}

        </div>

        {/* Пагінація */}
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

        {/* Кнопка для відображення всіх книг, якщо відфільтровані */}
        {filteredBooks.length > 0 && <div><Button className='d-flex gap-1 justify-content-center align-items-center' onClick={() => dispatch(unsortedBooks())}><IoChevronBack />Back to all books...</Button></div>}

      </div>
    </section>
  );
}

export default withLayout(Books);
