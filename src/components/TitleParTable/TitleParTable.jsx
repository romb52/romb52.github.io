import styles from '../App/App.module.css';
import Arrows from '../Arrows/Arrows';

export default function TitleParTable() {
  return (
    <div key='abcde' className={`${styles.item} ${styles.itemTitle}`}>
      <p>#</p>
      <p>
        Name
        <Arrows name='Name' />
      </p>
      <p>
        Articule
        <Arrows name='Articule' />
      </p>
      <p>
        Count
        <Arrows name='Count' />
      </p>
      <p>
        AVG Price
        <Arrows name='AVG Price' />
      </p>
      <p>
        Sum
        <Arrows name='Sum' />
      </p>
    </div>
  );
}
