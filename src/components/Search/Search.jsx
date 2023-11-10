import { Form, Button } from 'react-bootstrap';
import { useContext, useState } from 'react';
import styles from './Search.module.css';
import { GlobalContext } from '../../share/context';

export default function Search({ getSearch }) {
  const [value, setValue] = useState('');
  const { theme, size } = useContext(GlobalContext);

  return (
    <div className={styles.wrap}>
      <h1 className={`${size.wd>=1024 ? styles.big : styles.small}`}>Hello</h1>
      <Form.Group controlId='exampleForm.ControlInput1'>
        <Form.Control
          placeholder='...search'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          data-theme={theme}
        />
      </Form.Group>
      <Button onClick={() => getSearch(value)}>Search</Button>
      <Button
        variant='danger'
        onClick={() => {
          getSearch('');
          setValue('');
        }}
      >
        Clear
      </Button>
    </div>
  );
}
