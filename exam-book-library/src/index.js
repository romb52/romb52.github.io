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
    element: <Books />,
    errorElement:<Errorpage/>
  },
  {
    path: '/visitors',
    element: <Visitors />,
  },
  {
    path: '/cards',
    element: <Cards />,
  },
  {
    path: '/statistics',
    element: <Statistics />,
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
