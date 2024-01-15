import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import FormAuth from '../../components/FormAuth/FormAuth';
import { withLayout } from '../../components/Main/Main';

function SignIn() {
  return (
    <section>
      <div className='container'>
        <FormAuth
          title='Sign in'
          link='/signup'
          titleLink='Need an account?'
          isSignUp={false}
        />
      </div>
    </section>
  );
}

export default withLayout(SignIn);
