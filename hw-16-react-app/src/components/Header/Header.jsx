import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../share/reducers/auth.reducer';
import { IoCreateOutline } from 'react-icons/io5';
import styles from './Header.module.css';

export default function Header() {
  const { token, username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <header>
      <div className='container'>
        <div className={styles.wrap}>
          <div>Logo</div>
          <div className='d-flex gap-4'>
            <Link to='/'>Home</Link>
            {!token && token === '' && (
              <>
                <Link to='/signin'>SignIn</Link>
                <Link to='/signup'>SignUp</Link>
              </>
            )}

            {token && token !== '' && (
              <>
                <p>{username}</p>
                <Link to='/create-post'>
                  <IoCreateOutline />
                </Link>
                <p className={styles.logout} onClick={() => dispatch(logout())}>
                  Logout
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
