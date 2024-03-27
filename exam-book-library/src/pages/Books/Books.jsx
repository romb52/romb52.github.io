
import { withLayout } from '../../components/Main/Main';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { sortBooks, filterBooks, unsortedBooks } from '../../share/reducers/books.reducer';
import { MdEdit } from "react-icons/md";
import { FaPlus, FaSortAlphaDown, FaSortNumericDown, FaSearch } from "react-icons/fa";
import { IoReturnUpBack } from "react-icons/io5";
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

  // Ефект, який прокручує вікно до гори при зміні currentPage
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

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
    setCurrentPage(1);
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
          <Button className='d-flex gap-1 justify-content-center align-items-center' onClick={() => openModal(<AddBookForm openModal={openModal} />)}> <FaPlus /> New book</Button>
        </div>

        {/* Модальне вікно для додавання та редагування книг */}
        <Modal isModalOpen={isModalOpen} openModal={openModal}>
          {modalContent}
        </Modal>

        {/* Форми для сортування  */}
        <div className='rowGroupForms'>
          <div className="sortForm ">
            <Form className='d-flex gap-2 my-3 align-items-center' onSubmit={(e) => submitSort(e)}>
              <InputGroup >
                <InputGroup.Text >Sort by:</InputGroup.Text>
                <Form.Select value={sortField} onChange={sortChange}>
                  <option value="author">author</option>
                  <option value="title">title</option>
                  <option value="copiesAvailable">count</option>
                </Form.Select>
                <Button className='d-flex gap-1 align-items-center' variant='primary' type='submit'>
                  {sortField === 'copiesAvailable' ? <FaSortNumericDown /> : <FaSortAlphaDown />}
                </Button>
              </InputGroup>
            </Form>
          </div>

          {/* Форми для пошуку */}
          <div className='searchForm '>
            <Form className='d-flex gap-2 my-3 align-items-center' onSubmit={(e) => submitSearch(e)}>
              <InputGroup >
                <InputGroup.Text >Search:</InputGroup.Text>
                <Form.Control
                  name='search'
                  value={searchQuery}
                  onChange={(e) => searchInput(e)}
                />
                <Button className='d-flex gap-1 align-items-center' variant='primary' type='submit'>
                  <FaSearch />
                </Button>
              </InputGroup>
            </Form>
          </div>
        </div>

        {/* Відображення списку книг */}
        <div className={styles.grid}>
          <div key='head-book' className={`${styles.item} ${styles.tableTitle}`}>
            <p>id</p>
            <p>Title</p>
            <p>Author</p>
            <p>Publication year</p>
            <p>Publisher</p>
            <p>Page count</p>
            <p>Copies available</p>
            <p>Edit</p>
          </div>

          {/* Відображення відфільтрованих або всіх книг */}
          {filteredBooks.length > 0 ? currentFilteredBooks.map((book, i) => (
            <div key={book.id} className={styles.item}>
              <p data-label="ID">{indexOfFirstBook + i + 1}</p>
              <p data-label="Title">{book.title}</p>
              <p data-label="Author">{book.author}</p>
              <p data-label="Publication Year" className='justify-content-center'>{book.publicationYear}</p>
              <p data-label="Publisher" className='justify-content-center '>{book.publisher}</p>
              <p data-label="Page Count" className='justify-content-center'>{book.pageCount}</p>
              <p data-label="Copies Available" className='justify-content-center'>{book.copiesAvailable}</p>

              <Button className='d-flex gap-1 justify-content-center align-items-center' variant="success"
                onClick={() => openModal(<EditBookForm bookId={book.id} setIsModalOpen={setIsModalOpen} openModal={openModal} />)}>
                <MdEdit size={18} />Edit
              </Button>
            </div>

          )) : currentBooks.map((book, i) => (
            <div key={book.id} className={styles.item}>
              <p data-label="ID">{indexOfFirstBook + i + 1}</p>
              <p data-label="Title">{book.title}</p>
              <p data-label="Author">{book.author}</p>
              <p data-label="Publication Year" className='justify-content-center'>{book.publicationYear}</p>
              <p data-label="Publisher" className='justify-content-center '>{book.publisher}</p>
              <p data-label="Page Count" className='justify-content-center'>{book.pageCount}</p>
              <p data-label="Copies Available" className='justify-content-center'>{book.copiesAvailable}</p>

              <Button className='d-flex gap-1 justify-content-center align-items-center' variant="success"
                onClick={() => openModal(<EditBookForm bookId={book.id} setIsModalOpen={setIsModalOpen} openModal={openModal} />)}>
                <MdEdit size={18} />Edit
              </Button>
            </div>
          ))}

        </div>

        <div className={styles.footerFlex}>

          {/* Кнопка для відображення всіх книг, якщо відфільтровані */}
          {filteredBooks.length > 0 &&
            <div className={styles.leftContent}>
              <Button variant="outline-primary" className='d-flex gap-1 justify-content-center align-items-center' onClick={() => dispatch(unsortedBooks())}>
                <IoReturnUpBack />Back to all books
              </Button>
            </div>}

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
        </div>

      </div>
    </section>
  );
}

export default withLayout(Books);
