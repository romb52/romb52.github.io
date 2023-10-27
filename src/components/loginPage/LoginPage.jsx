import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { withLayout } from '../layout/Layout';

function LoginPage() {
  const navigate = useNavigate();
  return (
    <section>
      <div className='container'>
        <Button
          onClick={() => {
            localStorage.setItem('token', '1111');
            navigate('/posts');
          }}
        >
          login
        </Button>
      </div>
    </section>
  );
}

export default withLayout(LoginPage);
