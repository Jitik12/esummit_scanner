import { Outlet, useNavigate } from 'react-router-dom'

const Root = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/in/");
          }}
        >
          IN
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/out");
          }}
        >
          OUT
        </button>
      </div>
      <Outlet />
    </div>
  );
}

export default Root