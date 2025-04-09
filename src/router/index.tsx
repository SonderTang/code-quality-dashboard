import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Login = lazy(() => import('../pages/Login/index.tsx'))
// const DashboardLayout = lazy(() => import('@/layouts/Dashboard'))
// const CodeQuality = lazy(() => import('@/pages/Dashboard/CodeQuality'))

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Login />
  },
  // {
  //   path: '/',
  //   element: <AuthGuard />,
  //   children: [
  //     {
  //       element: <DashboardLayout />,
  //       children: [
  //         {
  //           index: true,
  //           element: <CodeQuality />
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   path: '*',
  //   element: <NotFound />
  // }
])