import { withLayout } from '../../components/Main/Main';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { filterVisitors, sortVisitors, unsortedVisitors } from '../../share/reducers/visitor.reducer';
import { MdEdit } from "react-icons/md";
import { FaPlus, FaSortAlphaDown, FaSortNumericDown, FaSearch } from "react-icons/fa";
import { IoReturnUpBack } from "react-icons/io5";
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

  // Ефект, який прокручує вікно до гори при зміні currentPage
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const sortChange = (e) => {         // Вибір і сортування полів для сортування відвідувачів
    setSortField(e.target.value); // Оновлення поля сортування при зміні вибору  
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
    setCurrentPage(1);
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
          <Button className='d-flex gap-1 justify-content-center align-items-center' onClick={() => openModal(<AddVisitorForm openModal={openModal} />)}> <FaPlus /> New visitor</Button>
        </div>

        {/* Модальне вікно для додавання та редагування відвідувачів */}
        <Modal isModalOpen={isModalOpen} openModal={openModal}>
          {modalContent}
        </Modal>

        {/* Форми для сортування */}
        <div className='rowGroupForms'>
          <div className="sortForm">
            <Form className='d-flex gap-2 my-3 align-items-center' onSubmit={(e) => submitSort(e)}>
              <InputGroup >
                <InputGroup.Text >Sort by:</InputGroup.Text>
                <Form.Select value={sortField} onChange={sortChange}>
                  <option value="name">name</option>
                  <option value="id">id</option>
                </Form.Select>
                <Button className='d-flex gap-1 align-items-center' variant='primary' type='submit'>
                  {sortField === 'id' ? <FaSortNumericDown /> : <FaSortAlphaDown />}
                </Button>
              </InputGroup>
            </Form>
          </div>

          {/* Форми для пошуку */}
          <div className='searchForm'>
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

        {/* Відображення списку відвідувачів */}
        <div className={styles.grid}>
          <div key='head-book' className={`${styles.item} ${styles.tableTitle}`}>
            <p>id</p>
            <p>Name</p>
            <p>Phone</p>
            <p>Edit</p>
          </div>

          {/* Відображення відфільтрованих або всіх відвідувачів */}
          {filteredVisitors.length > 0 ? currentFilteredVisitors.map((visitor, i) => (
            <div key={visitor.id} className={styles.item}>
              <p data-label="ID">{indexOfFirstVisitor + i + 1}</p>
              <p data-label="Name">{visitor.name}</p>
              <p data-label="Phone" className='justify-content-center'>{visitor.tel}</p>

              <Button className='d-flex gap-1 justify-content-center align-items-center' variant="success"
                onClick={() => openModal(<EditVisitorForm visitorId={visitor.id} setIsModalOpen={setIsModalOpen} openModal={openModal} />)}>
                <MdEdit size={18} /> Edit
              </Button>
            </div>

          )) : currentVisitors.map((visitor, i) => (
            <div key={visitor.id} className={styles.item}>
              <p data-label="ID">{indexOfFirstVisitor + i + 1}</p>
              <p data-label="Name">{visitor.name}</p>
              <p data-label="Phone" className='justify-content-center'>{visitor.tel}</p>

              <Button className='d-flex gap-1 justify-content-center align-items-center' variant="success"
                onClick={() => openModal(<EditVisitorForm visitorId={visitor.id} setIsModalOpen={setIsModalOpen} openModal={openModal} />)}>
                <MdEdit size={18} />Edit
              </Button>
            </div>
          ))}

        </div>

        <div className={styles.footerFlex}>
          {/* Кнопка для відображення всіх книг, якщо відфільтровані */}
          {filteredVisitors.length > 0 && <div className={styles.leftContent}><Button variant="outline-primary" className='d-flex gap-1 justify-content-center align-items-center' onClick={() => dispatch(unsortedVisitors())}>
            <IoReturnUpBack />Back to all visitors...</Button></div>}


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
        </div>       

      </div>
    </section>
  );
}

export default withLayout(Visitors);
