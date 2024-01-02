import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './components/layout/Layout';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import Errorpage from './components/error/ErrorPage';
import LoginPage from './components/loginPage/LoginPage';




const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><App /></Layout>,
    errorElement:<Layout><Errorpage/></Layout>
  },
  {
    path: "posts",
    element: <Layout><Posts/></Layout>,
  },
  {
    path: "post/:id",
    element: <Layout><Post/></Layout>,
  },
  {
    path: "login",
    element: <Layout><LoginPage/></Layout>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

