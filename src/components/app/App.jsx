// import styles from './App.module.css';
import { withLayout } from '../layout/Layout';

function App() {
  return (
    <section>
      <div className='container'>
        <h1>Home Page</h1>
      </div>
    </section>
  );
}

export default withLayout(App);
