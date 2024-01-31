import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import {Box} from '@mui/material';



const Root = () => {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (path) => {
    setSelectedButton(path);
    navigate(path);
  };

  return (
    <div style={{padding: ".5rem"}}> 
      <Box>
        <img src="/public/ecell_logo.png" alt="" />
      </Box>
      <Box style={{ display: "flex", "justify-content": "space-evenly" }}>
        <Button
          onClick={() => handleButtonClick("/in/")}
          style={{
            backgroundColor:
              selectedButton === "/in/" ? "#70fd70" : "transparent",
            flexGrow: 1,
          }}
        >
          IN
        </Button>
        <Button
          onClick={() => handleButtonClick("/out")}
          style={{
            backgroundColor:
              selectedButton === "/out" ? "#ff7171" : "transparent",
            flexGrow: 1,
          }}
        >
          OUT
        </Button>
        <Button
          onClick={() => handleButtonClick("/table")}
          style={{
            backgroundColor:
              selectedButton === "/table" ? "white" : "transparent",
            flexGrow: 1,
          }}
        >
          TABLE
        </Button>
      </Box>
      <Outlet />
    </div>
  );
};

export default Root;
