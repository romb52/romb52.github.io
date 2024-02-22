import { withLayout } from '../../components/Main/Main';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { filterVisitors, sortVisitors, unsortedVisitors } from '../../share/reducers/visitor.reducer';
import { MdEdit } from "react-icons/md";
import { FaPlus, FaSortDown } from "react-icons/fa";
import { IoChevronBack, IoSearch } from "react-icons/io5";
import Modal from '../../components/modal/Modal';
import styles from '../Visitors/Visitors.module.css';
import AddVisitorForm from '../../components/ModalContent/AddVisitorForm/AddVisitorForm';
import EditVisitorForm from '../../components/ModalContent/EditVisitorForm/EditVisitorForm';


function Visitors() {

  const visitors = useSelector(state => state.visitors.visitors);                    // Отримання списку відвідувачів та відфільтрованих відвідувачів зі стану
  const filteredVisitors = useSelector(state => state.visitors.filteredVisitors);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);           // Локальний стан для керування модальним вікном
  const [modalContent, setModalContent] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);                // Стан для керування поточною сторінкою та кількістю відвідувачів на сторінці
  const visitorsPerPage = 7;

  const [sortField, setSortField] = useState('name'); // Стан для зберігання вибраного поля сортування


  const [searchQuery, setSearchQuery] = useState(''); // Стан для зберігання пошукового запиту

  const indexOfLastVisitor = currentPage * visitorsPerPage;
  const indexOfFirstVisitor = indexOfLastVisitor - visitorsPerPage;
  const currentVisitors = visitors.slice(indexOfFirstVisitor, indexOfLastVisitor);
  const currentFilteredVisitors = filteredVisitors.slice(indexOfFirstVisitor, indexOfLastVisitor);

  const sortChange = (e) => {         // Вибір і сортування полів для сортування відвідувачів
    setSortField(e.target.value); // Оновлення поля сортування при зміні вибору
    //console.log(e.target.value)
  };

  const submitSort = (e) => {          // Обробник подання сортування
    e.preventDefault();
    dispatch(sortVisitors({ field: sortField, isNumber: sortField === 'id' }));
  };

  const searchInput = (e) => {          // Обробник введення пошукового запиту
    setSearchQuery(e.target.value); // Оновлення пошукового запиту при введенні користувачем
  };

  const submitSearch = (e) => {         // Обробник подання пошукового запиту  
    e.preventDefault();
    dispatch(filterVisitors(searchQuery)); // Викликаємо дію для фільтрації книг з введеним пошуковим запитом
    setSearchQuery('');
  };

  const openModal = (content) => {        // Обробник відкриття модального вікна
    setModalContent(content);
    setIsModalOpen((prev) => !prev);
  };

  return (
    <section>

      <div className='container d-flex flex-column justify-content-between '>

        {/* Заголовок та кнопка для відкриття модального вікна для додавання нового відвідувача */}
        <div className={`d-flex justify-content-between ${styles.titlewrap}`}>
          <h2>ALL VISITORS:</h2>
          <Button className='d-flex gap-1 justify-content-center align-items-center' onClick={() => openModal(<AddVisitorForm />)}> <FaPlus /> New visitor</Button>
        </div>

        {/* Модальне вікно для додавання та редагування відвідувачів */}
        <Modal isModalOpen={isModalOpen} openModal={openModal}>
          {modalContent}
        </Modal>

        {/* Форми для сортування */}
        <div className='row justify-content-between'>
          <div className="col-5 pe-1">
            <Form className='d-flex gap-2 mb-1 align-items-center' onSubmit={(e) => submitSort(e)}>
              <Form.Label style={{ whiteSpace: 'nowrap' }}>Sort by:</Form.Label>
              <Form.Select value={sortField} onChange={sortChange}>
                <option value="name">name</option>
                <option value="id">id</option>
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

        {/* Відображення списку відвідувачів */}
        <div className={styles.grid}>
          <div key='head-book' className={`${styles.item} ${styles.tableTitle}`}>
            <p>id</p>
            <p>
              Name
            </p>
            <p>
              Phone
            </p>
            <p>Edit</p>
          </div>

          {/* Відображення відфільтрованих або всіх відвідувачів */}
          {filteredVisitors.length > 0 ? currentFilteredVisitors.map((visitor, i) => (
            <div key={visitor.id} className={styles.item}>
              <p>{indexOfFirstVisitor + i + 1}</p>
              <p>{visitor.name}</p>
              <p className='justify-content-center'>{visitor.tel}</p>

              <Button className='d-flex gap-1 justify-content-center align-items-center' variant="success"
                onClick={() => openModal(<EditVisitorForm visitorId={visitor.id} />)}>
                <MdEdit size={18} /> Edit
              </Button>
            </div>

          )) : currentVisitors.map((visitor, i) => (
            <div key={visitor.id} className={styles.item}>
              <p>{indexOfFirstVisitor + i + 1}</p>
              <p>{visitor.name}</p>
              <p className='justify-content-center'>{visitor.tel}</p>

              <Button className='d-flex gap-1 justify-content-center align-items-center' variant="success"
                onClick={() => openModal(<EditVisitorForm visitorId={visitor.id} setIsModalOpen={setIsModalOpen} />)}>
                <MdEdit size={18} />Edit
              </Button>
            </div>
          ))}

        </div>

        {/* Відображення пагінації */}
        {filteredVisitors.length > 0 ? (
          <div className={styles.pagination}>
            <ul className='pagination'>
              {Array.from({ length: Math.ceil(filteredVisitors.length / visitorsPerPage) }).map((_, index) => (
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
              {Array.from({ length: Math.ceil(visitors.length / visitorsPerPage) }).map((_, index) => (
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

        {/* Кнопка для повернення до всіх відвідувачів, якщо вони були відфільтровані */}
        {filteredVisitors.length > 0 && <div><Button className='d-flex gap-1 justify-content-center align-items-center' onClick={() => dispatch(unsortedVisitors())}> <IoChevronBack /> Back to all visitors...</Button></div>}

      </div>
    </section>
  );
}

export default withLayout(Visitors);
