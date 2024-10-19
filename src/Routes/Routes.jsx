import React from 'react';
import {
    createBrowserRouter,
  } from "react-router-dom";
import Layout from '../Layout/Layout';
import Home from '../Pages/Home/Home';
import BookDetail from '../components/BookDetail/BookDetail';
import Searchlist from '../components/Searchlist/Searchlist';
import Wishlist from '../components/Wishlist/Wishlist';
import Cart from '../components/Cart/Cart';
import GenreFilter from '../components/GenreFilter/GenreFilter';

  export const router =createBrowserRouter([
    {
        path:'/',
        element: <Layout></Layout>,
        children:[
            {
                path:'/',
                element: <Home></Home>
            },
            {
              path:'/book/:id',
              element: <BookDetail></BookDetail>
          },
          {
            path:'/wishlist',
            element: <Wishlist></Wishlist>
        },
        {
          path:'/search',
          element: <Searchlist></Searchlist>
      },
      {
        path:'/cart',
        element: <Cart></Cart>
    },
    {
      path:'/category/:topic',
      element: <GenreFilter></GenreFilter>
  }
        ]
    }
  ])