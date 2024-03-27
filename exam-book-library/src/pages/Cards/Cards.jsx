import { withLayout } from '../../components/Main/Main';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { sortCards, filterCards, unsortedCards, updateCard } from '../../share/reducers/cards.reducer';
import { increaseBookCount } from '../../share/reducers/books.reducer';
import { FaPlus, FaSortAlphaDown, FaSortNumericDown, FaSearch } from "react-icons/fa";
import { IoReturnUpBack } from "react-icons/io5";
import { GiReturnArrow } from "react-icons/gi";
import Modal from '../../components/modal/Modal';
import AddCardForm from '../../components/ModalContent/AddCardForm/AddCardForm';
import styles from './Cards.module.css';


function Cards() {

  const cards = useSelector(state => state.cards.cards);                  // Отримання списку карток та відфільтрованих карток зі стану
  const filteredCards = useSelector(state => state.cards.filteredCards);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);                // Локальний стан для керування модальним вікном
  const [modalContent, setModalContent] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);              // Стан для керування поточною сторінкою та кількістю карток на сторінці
  const cardsPerPage = 7;

  const [sortField, setSortField] = useState('returnDate'); // Стан для зберігання вибраного поля сортування

  const [searchQuery, setSearchQuery] = useState(''); // Стан для зберігання пошукового запиту

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);
  const currentFilteredCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  // Ефект, який прокручує вікно до гори при зміні currentPage
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const sortChange = (e) => {         // Обробник зміни сортування
    setSortField(e.target.value); // Оновлення поля сортування при зміні вибору
  };

  const submitSort = (e) => {       // Обробник подання сортування
    e.preventDefault();
    dispatch(sortCards({ field: sortField, isNumber: (sortField === 'borrowDate' || sortField === 'returnDate') }));
  };

  const searchInput = (e) => {        // Обробник введення пошукового запиту 
    setSearchQuery(e.target.value); // Оновлення пошукового запиту при введенні користувачем
  };

  const submitSearch = (e) => {         // Обробник подання пошукового запиту
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterCards(searchQuery)); // Викликаємо дію для фільтрації книг з введеним пошуковим запитом
    setSearchQuery('');
  };

  const openModal = (content) => {       // Обробник відкриття модального вікна
    setModalContent(content);
    setIsModalOpen((prev) => !prev);
  };

  const setReturnDate = (id) => {           // Обробник оновлення дати повернення та збільшення лічильника книг
    dispatch(updateCard({ id }));
    const cardToUpdate = cards.find(card => card.id === id);
    if (cardToUpdate) {
      const bookId = cardToUpdate.bookId;
      dispatch(increaseBookCount({ id: bookId }));
    }
  }


  return (
    <section>
      <div className='container d-flex flex-column justify-content-between '>

        {/* Заголовок та кнопка для відкриття модального вікна для додавання нової картки */}
        <div className={`d-flex justify-content-between ${styles.titlewrap}`}>
          <h2>ALL CARDS:</h2>
          <Button className='d-flex gap-1 justify-content-center align-items-center' onClick={() => openModal(<AddCardForm openModal={openModal} />)}>
            <FaPlus /> New card
          </Button>
        </div>

        {/* Модальне вікно для додавання та редагування карток */}
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
                  <option value="returnDate">return date</option>
                  <option value="borrowDate">borrow Date</option>
                  <option value="visitor">visitor</option>
                  <option value="book">book</option>
                </Form.Select>
                <Button className='d-flex gap-1 align-items-center' variant='primary' type='submit'>
                  {sortField === 'returnDate' || sortField === 'borrowDate' ? <FaSortNumericDown /> : <FaSortAlphaDown />}
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

        {/* Відображення списку карток */}
        <div className={styles.grid}>
          <div key='head-book' className={`${styles.item} ${styles.tableTitle}`}>
            <p>id</p>
            <p>Visitor</p>
            <p>Book</p>
            <p>Borrow Date</p>
            <p>Return Date</p>
          </div>

          {/* Відображення відфільтрованих або всіх карток */}
          {filteredCards.length > 0 ? currentFilteredCards.map((card, i) => (
            <div key={card.id} className={styles.item}>
              <p data-label="ID">{indexOfFirstCard + i + 1}</p>
              <p data-label="Visitior">{card.visitor}</p>
              <p data-label="Book">{card.book}</p>
              <p data-label="Borrow date">{card.borrowDate}</p>
              {card.returnDate ? <p data-label="Return date">{card.returnDate}</p> : <Button onClick={() => setReturnDate(card.id)} variant="warning"><GiReturnArrow /> Return</Button>}
            </div>

          )) : currentCards.map((card, i) => (
            <div key={card.id} className={styles.item}>
              <p data-label="ID">{indexOfFirstCard + i + 1}</p>
              <p data-label="Visitior">{card.visitor}</p>
              <p data-label="Book">{card.book}</p>
              <p data-label="Borrow date">{card.borrowDate}</p>
              {card.returnDate ? <p data-label="Return date">{card.returnDate}</p> : <Button onClick={() => setReturnDate(card.id)} variant="warning"><GiReturnArrow /> Return</Button>}
            </div>
          ))}

        </div>

        <div className={styles.footerFlex}>
          {/* Кнопка для відображення всіх книг, якщо відфільтровані */}
          {filteredCards.length > 0 && <div className={styles.leftContent}><Button variant="outline-primary" className='d-flex gap-1 justify-content-center align-items-center' onClick={() => dispatch(unsortedCards())}>
            <IoReturnUpBack />Back to all cards...</Button></div>}

          {/* Відображення пагінації */}
          {filteredCards.length > 0 ? (
            <div className={styles.pagination}>
              <ul className='pagination'>
                {Array.from({ length: Math.ceil(filteredCards.length / cardsPerPage) }).map((_, index) => (
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
                {Array.from({ length: Math.ceil(cards.length / cardsPerPage) }).map((_, index) => (
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

export default withLayout(Cards);
