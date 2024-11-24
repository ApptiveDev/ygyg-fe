import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { RouterPath } from './path'
import { HomePage } from '@/pages/Home/Home'
import { PostPage } from '@/pages/Post/Post'
import Page from '@/components/templates/page'

const router = createBrowserRouter([
  {
    path: RouterPath.ROOT,
    element: <Page />,
    children: [
      { path: RouterPath.HOME, element: <HomePage /> },
      { path: RouterPath.POST, element: <PostPage /> },
    ],
  },
])
export const Routes = () => {
  return <RouterProvider router={router} />
}
