import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import UserIn from './UserIn'
import Root from './router/Root'
import UserOut from './UserOut'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: 'in/',
          element: <UserIn />
        },
        {
          path: 'out/',
          element: <UserOut />
        },
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App