import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'

import 'kku-ui/index.css'
import './styles/global.css'
import './styles/animations.css'
import './styles/vendors.css'

ReactDOM.createRoot(document.getElementById('ez-paint') as HTMLElement).render(<RouterProvider router={router} />)
