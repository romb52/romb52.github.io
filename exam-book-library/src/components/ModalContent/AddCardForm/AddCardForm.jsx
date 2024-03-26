import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addCard } from '../../../share/reducers/cards.reducer';
import { decreaseBookCount } from '../../../share/reducers/books.reducer';
import { FaRegSave } from "react-icons/fa";
import styles from '../AddBookForm/AddBookForm.module.css';

export default function AddVisitorForm({ openModal }) {
    const visitors = useSelector(state => state.visitors.visitors);
    const books = useSelector(state => state.books.books);   

    const initialForm = { id: 0, visitorId: 0, bookId: 0, visitor: "", book: "", borrowDate: "", returnDate: "" };
    const dispatch = useDispatch();
    const [form, setForm] = useState(initialForm);

    const changeInput = (e) => {
        const id = e.target.options[e.target.selectedIndex].getAttribute('data-id');
        if (id) {
            setForm((prev) => {
                return { ...prev, [e.target.name]: e.target.value, [`${e.target.name}Id`]: id };
            });
        }
    };
    
    const submitNewCard = (e) => {
        e.preventDefault();
        if (form.book === "" || form.visitor === "") { return };
        const id = Date.now();
        dispatch(addCard({ ...form, id }));
        dispatch(decreaseBookCount({ id: form.bookId }));
        setForm(initialForm);
    };

    return (
        <>
            <h2 className={styles.title}>New card</h2>

            <Form className='d-flex flex-column gap-1 mb-2' onSubmit={(e) => submitNewCard(e)}>
                
                <FloatingLabel
                    controlId="visitor"
                    label="Visitor"
                    className="mb-3"
                >
                    <Form.Select name='visitor' value={form.visitor} onChange={(e) => changeInput(e)}>
                        <option>Please select a visitor from the dropdown list</option>
                        {visitors.map(visitor => (
                            <option key={visitor.id} value={visitor.name} data-id={visitor.id}>{visitor.name}</option>
                        ))}
                    </Form.Select>
                </FloatingLabel>
                
                <FloatingLabel
                    controlId="book"
                    label="Book"
                    className="mb-3"
                >
                     <Form.Select name='book' value={form.book} onChange={(e) => changeInput(e)}>
                        <option>Please select a book from the dropdown list</option>
                        {books.map(book => ((book.copiesAvailable > 0) &&
                            <option key={book.id} data-id={book.id} value={book.title}>{book.title}</option>
                        ))}
                    </Form.Select>
                </FloatingLabel>

                <div className='modalContentBtnGroup'>
                    <Button className='modalContentBtn me-2' variant='outline-secondary' onClick={() => openModal()}>
                        CANCEL
                    </Button>

                    <Button className='d-flex gap-2  justify-content-center align-items-center modalContentBtn' variant='primary' type='submit'><FaRegSave />
                        SAVE CARD
                    </Button>
                </div>

            </Form>
        </>
    );
}