import { useAppSelector } from '../../share/hooks.redux';
import Alert from 'react-bootstrap/Alert';
import styles from './Error.module.css';

export default function Error(): JSX.Element {
  const message = useAppSelector((state) => state.error.message);
  const errors = useAppSelector((state) => state.error.errors);
  return (
    <div className={styles.wrap}>
      {message || errors ? (
        <div className="container my-5">
          {message && <Alert variant="danger">{message}</Alert>}
          {errors && errors.body.map((item) => <Alert key={item} variant="danger">{item}</Alert>)}
        </div>
      ) : null}
    </div>
  );

}