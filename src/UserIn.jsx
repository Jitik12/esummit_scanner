import { useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

function UserIn() {
  const [userID, setUserID] = useState("");
  const [response, setResponse] = useState({});

  const onChange = (e) => {
    e.preventDefault();
    setUserID(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserID(e.target.user_id.value);
    console.log(userID);
    try {
      const response = await axios.get(`https://scanner.iith-ac.in:8000/in/${userID}`);
      console.log("Data Fetched")
	    console.log(response.data);
      setResponse(response.data);
    } catch (error) {
	console.log("Could not fetch data")
      console.error(error);
    }
    setUserID("");
  };

  return (
    <>
      <Box className="display" bgcolor={"#80ff80"}>
        <Box>
          <Typography variant="h4">Name : {response.name}</Typography>
          <Typography variant="h4">Email : {response.email}</Typography>
          <Typography variant="h4">Phone : {response.phone}</Typography>
          <Typography variant="h4">Status : {response.status}</Typography>
        </Box>
        <Box className="main_form">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label htmlFor="user_id">User ID : </label>
              <input
                type="text"
                id="user_id"
                name="user_id"
                value={userID}
                onChange={(e) => onChange(e)}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </Box>
      </Box>
    </>
  );
}

export default UserIn;
