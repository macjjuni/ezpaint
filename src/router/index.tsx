import { createBrowserRouter } from 'react-router-dom'
import Home from '@/pages/Home'
import Error from '@/pages/Error'
import App from '@/App'

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '*',
        element: <Error />,
      },
    ],
  },
])

export default router
