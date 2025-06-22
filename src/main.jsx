import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider,Navigate } from 'react-router-dom'
import AddItemPage from './pages/Add-item.jsx'
import ViewItemPage from './pages/View-page.jsx'
import AllItemsPage from './pages/AllItemsPage.jsx'
const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {path:'/',element:<AddItemPage/>},
      {path:'/add-item',element:<AddItemPage/>},
      {path:'/view-item',element:<AllItemsPage/>},
      {path:'/view-item/:id',element:<ViewItemPage/>},
    ]
  }
])


createRoot(document.getElementById('root')).render(
 
 <StrictMode>
  <RouterProvider router={router} />
</StrictMode>

)
