import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Loader from './components/loader/Loader'

import {
    Login
  } from './pages'


export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loader />}>
        <MainLayout />
      </Suspense>
    ),
    children: [

      {
        path: '/',
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        )
      },   

    ]
  }
])

/*
if you wants to add a new route please create a new component
on the pages file ./pages

then

add a new object with the path and element properties

    {
        path: '',
        element: <>
      },

      inside the children propertie.
*/