import { withLayout } from '../../components/Main/Main';
import { useSelector } from 'react-redux';
import { GiTrophyCup } from "react-icons/gi";
import styles from '../Statistics/Statistics.module.css';


function Statistics() {
  const cards = useSelector(state => state.cards.cards);  // Отримання списку карток зі стану Redux

  // Підрахунок кількості видач для кожної книги
  const bookIssuancesCount = cards.reduce((acc, card) => {
    if (acc[card.book]) {
      acc[card.book]++;
    } else {
      acc[card.book] = 1;
    }
    return acc;
  }, {});

  // Створення масиву з парами bookId-кількість видач та сортування його за кількістю видач
  const sortedBookIssuances = Object.entries(bookIssuancesCount).sort(([, a], [, b]) => b - a);

  // Вибір перших п'яти найпопулярніших книг
  const topFiveBooks = sortedBookIssuances.slice(0, 5);


  // Підрахунок кількості видач для кожного відвідувача
  const visitorIssuancesCount = cards.reduce((acc, card) => {
    if (acc[card.visitor]) {
      acc[card.visitor]++;
    } else {
      acc[card.visitor] = 1;
    }
    return acc;
  }, {});

  // Створення масиву з парами visitorId-кількість видач та сортування його за кількістю видач
  const sortedVisitorIssuances = Object.entries(visitorIssuancesCount).sort(([, a], [, b]) => b - a);

  // Вибір перших п'яти найбільш активних відвідувачів
  const topFiveVisitors = sortedVisitorIssuances.slice(0, 5);

  return (
    <section>
      <div className='container d-flex flex-column justify-content-between '>

        <div className={`d-flex justify-content-between ${styles.titlewrap}`}>
          <h2>STATISTICS:</h2>
        </div>
        <div className={styles.tablewrap}>
          <div className={styles.grid}>
            <div key='head-book' className={`${styles.item} ${styles.tableTitle}`}>
              <p>id</p>
              <p><GiTrophyCup className='me-2' />
                Top books
              </p>
              <p><GiTrophyCup className='me-2' />
                Top visitors
              </p>
            </div>

            {/* Відображення п'яти найпопулярніших книг та відвідувачів */}
            {topFiveBooks.map((book, i) => (
              <div key={book} className={styles.item}>
                <p>{i + 1}</p>
                <p>{book[0]}</p>
                <p>{topFiveVisitors[i][0]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default withLayout(Statistics);
