import { createRoot } from 'react-dom/client';
import './styles.css';
import Books from './pages/Books/Books';
import { Provider } from 'react-redux';
import { store } from './share/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Statistics from './pages/Statistics/Statistics';
import Cards from './pages/Cards/Cards';
import Visitors from './pages/Visitors/Visitors';
import Errorpage from './pages/ErrorPage/ErrorPage';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: '/', 
    errorElement:<Errorpage/>
  },
  {
    path: '/book-library',
    element: <Books />,
    errorElement:<Errorpage/>
  },
  {
    path: '/book-library/visitors',
    element: <Visitors />,  
  },
  {
    path: '/book-library/cards',
    element: <Cards />,
  },
  {
    path: '/book-library/statistics',
    element: <Statistics />,
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
