import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { RouterPath } from './path'
import { HomePage } from '@/pages/Home/Home'

const router = createBrowserRouter([
  {
    path: RouterPath.HOME,
    element: <HomePage />,
  },
])
export const Routes = () => {
  return <RouterProvider router={router} />
}
