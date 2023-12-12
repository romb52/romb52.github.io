import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../share/hooks.redux';
import { logout } from '../../share/reducers/auth.reducer';

export default function Header(): JSX.Element {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  return (
    <header>
      <div className='container h-container'>
        <Link to='/'>Home</Link>
        {token === '' ? (
          <Link to='/auth'>Auth</Link>
        ) : (
            <Button onClick={():void => { dispatch(logout()) }}>Logout</Button>
        )}
      </div>
    </header>
  );
}
