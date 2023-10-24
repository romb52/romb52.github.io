import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './components/app/App';
import Layout from './components/layout/Layout';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import ErrorPage from './components/errorPage/ErrorPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <App />
      </Layout>
    ),
    errorElement: (
      <Layout>
        <ErrorPage />
      </Layout>
    ),
  },
  {
    path: 'posts',
    element: (
      <Layout>
        <Posts />
      </Layout>
    ),
  },
  {
    path: 'post/:id',
    element: (
      <Layout>
        <Post />
      </Layout>
    ),
  },
]);

root.render(<RouterProvider router={router} />);
