import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { updateVisitor, removeVisitor } from '../../../share/reducers/visitor.reducer';
import styles from '../AddBookForm/AddBookForm.module.css';

export default function EditBookForm({ visitorId, setIsModalOpen, openModal }) {
  const visitors = useSelector(state => state.visitors.visitors);
  const visitor = visitors.find((item) => item.id === visitorId);
  const initialForm = { name: '', tel: '' };
  const dispatch = useDispatch();
  const [form, setForm] = useState({ ...visitor });
  const [changedId, setChangedId] = useState(visitorId);

  useEffect(() => {
    setForm({ ...visitor });
    setChangedId(visitorId);
  }, [visitorId]);

  const changeInput = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const submiEditVisitor = (e) => {
    e.preventDefault();
    dispatch(updateVisitor({ ...form, id: changedId }));
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
        
        <FloatingLabel
          controlId="name"
          label="Full name"
          className="mb-3"
        >
          <Form.Control
            placeholder='name'
            name='name'
            value={form.name}
            onChange={(e) => changeInput(e)}
            required
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="tel"
          label="Phone number"
          className="mb-3"
        >
          <Form.Control
            placeholder='Phone number'
            value={form.tel}
            name='tel'
            onChange={(e) => changeInput(e)}
            pattern="^[0-9 \-]*$"
            title="Only digits, space, and dash are allowed"
            required
          />
        </FloatingLabel>
 
        <Button className='d-flex gap-1 justify-content-center align-items-center'
          variant='danger'
          onClick={() => deleteVisitor(visitor.id)}
        >
          <MdDelete size={18}/>
          DELETE VISITOR
        </Button>

        <div className='modalContentBtnGroup'>
          <Button className='modalContentBtn me-2' variant='outline-secondary' onClick={() => openModal()}>
            CANCEL
          </Button>

          <Button className='modalContentBtn' variant='primary' type='submit'>
            EDIT BOOK
          </Button>
        </div>

      </Form>
    </>
  );
}