import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addVisitor } from '../../../share/reducers/visitor.reducer';
import styles from '../AddBookForm/AddBookForm.module.css';

export default function AddVisitorForm() {
    const initialForm = { id: 0, name: '', tel: '' };
    const dispatch = useDispatch();
    const [form, setForm] = useState(initialForm);

    const changeInput = (e) => {
        //console.log(e.target.name, e.target.value);
        if (e.target.name === 'tel') {
            const isValidInput = /^[0-9 -]*$/.test(e.target.value);
            //console.log(isValidInput);
            if (!isValidInput) {
                return;
            }
        }
        setForm((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };
    const submitAddVisitor = (e) => {
        //console.log(form)
        e.preventDefault();
        const id = Date.now();
        dispatch(addVisitor({ ...form, id }));
        setForm(initialForm);
    };

    return (
        <>
            <h2 className={styles.title}>Add visitor</h2>

            <Form className='d-flex flex-column gap-1 mb-2' onSubmit={(e) => submitAddVisitor(e)}>
                <Form.Group className='mb-3' controlId='name'>
                    <Form.Label>Full name</Form.Label>
                    <Form.Control
                        placeholder='name'
                        name='name'
                        value={form.name}
                        onChange={(e) => changeInput(e)}
                        required
                    />
                </Form.Group>

                <Form.Group className='mb-3' controlId='tel'>
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                        placeholder='Phone number'
                        value={form.tel}
                        name='tel'
                        onChange={(e) => changeInput(e)}
                        pattern="^[0-9 \-]*$"
                        title="Only digits, space, and dash are allowed"
                        required
                    />
                </Form.Group>

                <Button className='my-3' variant='primary' type='submit'>
                    Add new visitor
                </Button>

            </Form>
        </>
    );
}