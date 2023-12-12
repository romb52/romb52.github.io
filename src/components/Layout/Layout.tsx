import { ReactNode } from 'react';
import Header from '../Header/Header';
import Spinner from 'react-bootstrap/Spinner';
import { useAppSelector } from '../../share/hooks.redux';
import Error from '../Error/Error';

interface ILayoutProps {
  children: ReactNode;
}

function Layout({ children }: ILayoutProps): JSX.Element {
  const isLoading = useAppSelector((state) => state.loader.isLoading);
  return (
    <>
      <Header />
      {isLoading && (
        <div className='container my-5'>
          <Spinner animation='border' variant='primary' />
        </div>
      )}
      <Error />
      {children}
    </>
  );
}

export const withLayout = <Props extends Object>(
  Component: React.ComponentType<Props>
) =>
  function wLC(props: Props) {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
