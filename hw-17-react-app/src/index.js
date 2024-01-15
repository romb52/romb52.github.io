import { createRoot } from 'react-dom/client';
import './styles.css';
import Home from './pages/Home/Home';
import { Provider } from 'react-redux';
import { store } from './share/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
