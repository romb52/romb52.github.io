import { useEffect } from 'react';
import { Link, useRouteError, useLocation, useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname !== '/404') {
      navigate('/404')
    }
  }, [navigate, location])
  return (
    <section>
      <div className='container'>
        <h1>Oops! This page not found</h1>
        <Link to='/'>
          <h3>Go to Home Page</h3>
        </Link>
        <p>error message: {error.statusText || error.message}</p>
      </div>
    </section>
  );
}
