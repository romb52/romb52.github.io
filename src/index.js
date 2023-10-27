import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import App from './components/app/App';

import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import ErrorPage from './components/errorPage/ErrorPage';
import LoginPage from './components/loginPage/LoginPage';
import PrivateRoute from './components/privateRoute/PrivateRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />} path='/' />
      <Route element={<PrivateRoute component={Posts} />} path='/posts' />
      <Route element={<PrivateRoute component={Post} />} path='/post/:id' />
      <Route element={<ErrorPage />} path='/404' />
      <Route path='*' element={<Navigate to='/404' />} />
      <Route path='login' element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
);
