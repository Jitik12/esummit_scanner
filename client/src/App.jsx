import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import UserIn from './UserIn'
import Root from './router/Root'
import UserOut from './UserOut'
import Table from "./router/Table";

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
        {
          path: 'table/',
          element: <Table />
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