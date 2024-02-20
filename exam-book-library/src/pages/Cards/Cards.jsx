import { withLayout } from '../../components/Main/Main';


import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { Button, Form } from 'react-bootstrap';

import { sortCards, filterCards, unsortedCards, updateCard } from '../../share/reducers/cards.reducer';

//import { MdEdit } from "react-icons/md";
import { FaPlus, FaSortDown } from "react-icons/fa";
import { IoChevronBack, IoSearch } from "react-icons/io5";
import { GiReturnArrow } from "react-icons/gi";

import Modal from '../../components/modal/Modal';
import AddCardForm from '../../components/ModalContent/AddCardForm/AddCardForm';
//import EditBookForm from '../../components/ModalContent/EditBookForm/EditBookForm';

import styles from './Cards.module.css';
import { increaseBookCount } from '../../share/reducers/books.reducer';


function Cards() {

  const cards = useSelector(state => state.cards.cards);
  const filteredCards = useSelector(state => state.cards.filteredCards);
  const dispatch = useDispatch();


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // const [changedId, setChangedId] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 5;

  const [sortField, setSortField] = useState('returnDate'); // Стан для зберігання вибраного поля сортування


  const [searchQuery, setSearchQuery] = useState(''); // Стан для зберігання пошукового запиту

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);
  const currentFilteredCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  const sortChange = (e) => {
    setSortField(e.target.value); // Оновлення поля сортування при зміні вибору
  };

  const submitSort = (e) => {
    e.preventDefault();
    dispatch(sortCards({ field: sortField, isNumber: (sortField === 'borrowDate' || sortField === 'returnDate') }));
  };

  const searchInput = (e) => {
    setSearchQuery(e.target.value); // Оновлення пошукового запиту при введенні користувачем
  };

  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(filterCards(searchQuery)); // Викликаємо дію для фільтрації книг з введеним пошуковим запитом
    setSearchQuery('');
  };

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen((prev) => !prev);
  };

  const setReturnDate = (id) => {
    //setChangedId(id);  
    dispatch(updateCard({ id }));
    const cardToUpdate = cards.find(card => card.id === id);
    console.log(cardToUpdate)
    if(cardToUpdate){
      const bookId = cardToUpdate.bookId;
    dispatch(increaseBookCount({ id: bookId }));
  }   
  }


  return (
    <section>
      <div className='container d-flex flex-column justify-content-between '>

        <div className={`d-flex justify-content-between ${styles.titlewrap}`}>
          <h2>ALL CARDS:</h2>
          <Button className='d-flex gap-1 justify-content-center align-items-center' onClick={() => openModal(<AddCardForm />)}>
            <FaPlus /> New card
          </Button>
        </div>

        <Modal isModalOpen={isModalOpen} openModal={openModal}>
          {modalContent}
        </Modal>


        <div className='row justify-content-between'>
          <div className="col-5 pe-1">
            <Form className='d-flex gap-2 mb-1 align-items-center' onSubmit={(e) => submitSort(e)}>
              <Form.Label style={{ whiteSpace: 'nowrap' }}>Sort by:</Form.Label>
              <Form.Select value={sortField} onChange={sortChange}>
                <option value="returnDate">return date</option>
                <option value="borrowDate">borrow Date</option>
                <option value="visitor">visitor</option>
                <option value="book">book</option>
              </Form.Select>
              <Button className='my-3 d-flex gap-1 align-items-center' variant='primary' type='submit'><FaSortDown />
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
              <Button className='my-3 d-flex gap-1 align-items-center' variant='primary' type='submit'><IoSearch />
                Search
              </Button>
            </Form>
          </div>
        </div>

        <div className={styles.grid}>
          <div key='head-book' className={`${styles.item} ${styles.tableTitle}`}>
            <p>id</p>
            <p>
              Visitor
            </p>
            <p>
              Book
            </p>
            <p>
              Borrow Date
            </p>
            <p>
              Return Date
            </p>
          </div>

          {filteredCards.length > 0 ? currentFilteredCards.map((card, i) => (
            <div key={card.id} className={styles.item}>
              <p>{indexOfFirstCard + i + 1}</p>
              <p>{card.visitor}</p>
              <p>{card.book}</p>
              <p>{card.borrowDate}</p>
              {card.returnDate ? <p >{card.returnDate}</p> : <Button variant="warning"><GiReturnArrow /> </Button>}
            </div>

          )) : currentCards.map((card, i) => (
            <div key={card.id} className={styles.item}>
              <p>{indexOfFirstCard + i + 1}</p>
              <p>{card.visitor}</p>
              <p>{card.book}</p>
              <p >{card.borrowDate}</p>
              {card.returnDate ? <p >{card.returnDate}</p> : <Button onClick={() => setReturnDate(card.id)} variant="warning"><GiReturnArrow /> </Button>}
            </div>
          ))}

        </div>

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

        {filteredCards.length > 0 && <Button className='d-flex gap-1 justify-content-center align-items-center' onClick={() => dispatch(unsortedCards())}><IoChevronBack />Back to all cards...</Button>}

      </div>
    </section>
  );
}

export default withLayout(Cards);
