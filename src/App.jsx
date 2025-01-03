import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
import GetProd from './components/GetProd';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <GetProd />,
    },
    {
      path: "/:id",
      element: <ProductDetail />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

