import Footer from '../footer/Footer';
import Header from '../header/Header';
import Layout from '../layout/Layout';
import List from '../list/List';
import styles from './App.module.css';

function App() {
  const title = 'Hello, User';
  const headerTitle = 'Header!!!!';
  const menu = 'Menu';

  const arr = ['apple', 'android', 'samsung'];
  const items = [
    { title: 'Apple', desc: 'Apple desc', id: 1, price: 10 },
    { title: 'Orange', desc: 'Orange desc', id: 2, price: 20 },
    { title: 'Peach', desc: 'Peach desc', id: 3, price: 30 },
    { title: 'Lemon', desc: 'Lemon desc', id: 4, price: 40 },
    { title: 'Grape', desc: 'Grape desc', id: 5, price: 50 },
  ];
  return (
    <>
      <Header headerTitle={headerTitle} headerMenu={menu} />
      <div className='container'>
        <List arr={arr} objArr={items} />
        <div className={styles['app-wrap']} id='app'>
          {title}
        </div>
        <Layout>
          <p>Lorem lorem lorem</p>
        </Layout>

        <Layout>
          <span>SPAN SPAN</span>
        </Layout>

        <Layout>
          <h1>Page Title</h1>
        </Layout>
      </div>
      <Footer isAqua={true} />
    </>
  );
}

export default App;
