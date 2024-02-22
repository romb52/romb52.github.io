import { Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { updateVisitor, removeVisitor } from '../../../share/reducers/visitor.reducer';
import styles from '../AddBookForm/AddBookForm.module.css';

export default function EditBookForm({ visitorId, setIsModalOpen }) {
  const visitors = useSelector(state => state.visitors.visitors);
 const visitor = visitors.find((item) => item.id === visitorId);
  const initialForm = { name: '', tel: ''};
  const dispatch = useDispatch();
  const [form, setForm] = useState({ ...visitor });
  const [changedId, setChangedId] = useState(visitorId);

  useEffect(() => {   
    setForm({ ...visitor });  
}, [visitorId]);

  const changeInput = (e) => {
    //console.log(e.target.name, e.target.value)
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const submiEditVisitor = (e) => {
    e.preventDefault();
    //console.log(form)
    dispatch(updateVisitor({ ...form, id: changedId }));
    setForm(initialForm);
    setChangedId(0);
    setIsModalOpen(false); // Закриття модального вікна після редагування книги
  };

  const deleteVisitor = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this book?'); // Відображення підтвердження браузера

    if (isConfirmed) {
      dispatch(removeVisitor(id));
      setForm(initialForm);
      setIsModalOpen(false); // Закриття модального вікна після видалення книги
    }
  };

  return (
    <>
      <h2 className={styles.title}>Edit visitor</h2>

      <Form className='d-flex flex-column gap-1 mb-2' onSubmit={(e) => submiEditVisitor(e)}>
        <Form.Group className='mb-3' controlId='title'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            placeholder='Name'
            name='name'
            value={form.name}
            onChange={(e) => changeInput(e)}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='author'>
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            placeholder='Phone number'
            value={form.tel}
            name='tel'
            onChange={(e) => changeInput(e)}
            required
          />
        </Form.Group>        

        <Button className='my-3' variant='primary' type='submit'>
          Edit book
        </Button>
        <Button
          variant='danger'
          onClick={() => deleteVisitor(visitor.id)}
        >
          Delete book
        </Button>

      </Form>
    </>
  );
}