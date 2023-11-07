import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import styles from './Search.module.css';

export default function Search({ getSearch }) {
  const [value, setValue] = useState('');
  return (
    <div className={styles.wrap}>
      <Form.Group controlId='exampleForm.ControlInput1'>
        <Form.Control
          placeholder='...search'
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
