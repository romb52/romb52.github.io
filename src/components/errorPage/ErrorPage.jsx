import { Link } from 'react-router-dom';
import { withLayout } from '../layout/Layout';

function ErrorPage() {
  return (
    <section>
      <div className='container'>
        <h1>Oops! This page not found</h1>
        <Link to='/'>
          <h3>Go to Home Page</h3>
        </Link>
      </div>
    </section>
  );
}

export default withLayout(ErrorPage);
