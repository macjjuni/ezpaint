import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'

ReactDOM.createRoot(document.getElementById('ez-paint') as HTMLElement).render(<RouterProvider router={router} />)
