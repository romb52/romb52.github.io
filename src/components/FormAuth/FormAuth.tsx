import { FormEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { fetchAuth } from '../../share/api/auth.api';
import { useAppDispatch } from '../../share/hooks.redux';

interface IProps {
  isReg: boolean;
  id: number;
}
interface IForm {
  email: string;
  username?: string;
  password: string;
}

const initialState: IForm = {
  email: '',
  username: '',
  password: '',
};
export default function FormAuth({ isReg, id }: IProps) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<IForm>(initialState);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handlerSumbit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    await dispatch(
      fetchAuth({ body: form, path: isReg ? '/users' : '/users/login' })
    );
  };
  return (
    <Form
      className='w-25'
      onSubmit={(e: FormEvent<HTMLFormElement>) => handlerSumbit(e)}
    >
      {isReg && (
        <Form.Group className='mb-3' controlId={`username-${id}`}>
          <Form.Label>User Name</Form.Label>
          <Form.Control
            name='username'
            placeholder='User Name'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              changeHandler(e)
            }
            value={form.username}
          />
        </Form.Group>
      )}

      <Form.Group className='mb-3' controlId={`email-${id}`}>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='email'
          name='email'
          placeholder='Enter email'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            changeHandler(e)
          }
          value={form.email}
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId={`password-${id}`}>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          name='password'
          placeholder='Password'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            changeHandler(e)
          }
          value={form.password}
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
}
