import { Link, useLocation } from 'react-router-dom';

export default function Menu() {
  let location = useLocation();

  
  return (
    <nav>
      <ul className='d-flex gap-3'>
        <li key='home' className={location.pathname === '/' ? 'active' : ''}>
          <Link to='/'>Home</Link>
        </li>
        <li
          key='posts'
          className={location.pathname === '/posts' ? 'active' : ''}
        >
          <Link to='/posts'>Posts</Link>
        </li>
      </ul>
    </nav>
  );
}
