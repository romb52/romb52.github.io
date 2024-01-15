import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Main({ children }) {
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
