import Header from '../Header/Header';


function Main({ children }) {
 
  return (
    <>
      <Header />
      <>{children}</>     
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
