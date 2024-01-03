import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './components/layout/layout';
import Product from './components/product/Product';






const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><App /></Layout>,    
  },
  {
    path: "product/:id",
    element: <Layout><Product/></Layout>,
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
