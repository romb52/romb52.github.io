import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../../share/reducers/auth.reducer';

function Main({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, []);
  return (
    <>
      <Header />
      <>{children}</>
      <Footer />
    </>
  );
}

export const withLayout = (Component) =>
  function wLC(props) {
    return (
      <Main>
        <Component {...props} />
      </Main>
    );
  };
