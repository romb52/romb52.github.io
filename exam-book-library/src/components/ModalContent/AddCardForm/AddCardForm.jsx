import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addCard } from '../../../share/reducers/cards.reducer';
import { decreaseBookCount } from '../../../share/reducers/books.reducer';
import { FaRegSave } from "react-icons/fa";
import styles from '../AddBookForm/AddBookForm.module.css';

export default function AddVisitorForm() {
    const visitors = useSelector(state => state.visitors.visitors);
    const books = useSelector(state => state.books.books);

    // visitor: visitors.length > 0 ? visitors[0].name : "", book: books.length > 0 ? books[0].title : ""
    
    const initialForm = { id: 0, visitorId: 0, bookId: 0, visitor: "", book: "", borrowDate: "", returnDate: "" };
    const dispatch = useDispatch();
    const [form, setForm] = useState(initialForm);

    const changeInput = (e) => {
        const id = e.target.options[e.target.selectedIndex].getAttribute('data-id');
       // console.log(e.target.name, e.target.value, id);
        if (id) {
            setForm((prev) => {
                return { ...prev, [e.target.name]: e.target.value, [`${e.target.name}Id`]: id };
            });
        }
    };
    const submitNewCard = (e) => {
        //console.log(form)
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
                <Form.Group className='mb-3' controlId='name'>
                    <Form.Label>Visitor</Form.Label>
                    <Form.Select name='visitor' value={form.visitor} onChange={(e) => changeInput(e)}>
                        <option>Please select a visitor from the dropdown list</option>
                        {visitors.map(visitor => (
                            <option key={visitor.id} value={visitor.name} data-id={visitor.id}>{visitor.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className='mb-3' controlId='tel'>
                    <Form.Label>Book</Form.Label>
                    <Form.Select name='book' value={form.book} onChange={(e) => changeInput(e)}>
                        <option>Please select a book from the dropdown list</option>
                        {books.map(book => ((book.copiesAvailable > 0) &&
                            <option key={book.id} data-id={book.id} value={book.title}>{book.title}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button className='d-flex gap-1 justify-content-center align-items-center my-3' variant='primary' type='submit'><FaRegSave />
                    Save card
                </Button>

            </Form>
        </>
    );
}