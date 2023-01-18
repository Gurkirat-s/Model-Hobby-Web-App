import './App.scss';
import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import React from 'react';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Sale from './pages/Sale/Sale';
import Featured from './pages/Featured/Featured';
import New from './pages/New/New';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import ProductPage from './pages/ProductPage/ProductPage';
import Shipping from './pages/Shipping/Shipping';
import Finish from './pages/Finish/Finish';
import ShippingAddress from './utils/services/ShippingAddress';

const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'shipping',
        element: <Shipping />,
      },
      {
        path: 'finish',
        element: <Finish />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'category/:id',
        element: <CategoryPage />,
        // children: [
        //   {
        //     path: 'product/:id',
        //     element: <ProductPage />,
        //   },
        // ],
      },
      {
        path: 'product/:id',
        element: <ProductPage />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
