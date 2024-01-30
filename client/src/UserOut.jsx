import { useState } from "react";
import axios from "axios";

function UserOut() {
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
      const response = await axios.get(`https://scanner.iith-ac.in:8000/out/${userID}`);
      console.log(response.data);
      setResponse(response.data);
    } catch (error) {
      console.error(error);
    }
    setUserID("");
  };

  return (
    <>
      <div className="display">
        <div>
          <h1>Name : {response.name}</h1>
          <h1>Email : {response.email}</h1>
          <h1>Phone : {response.phone}</h1>
          <h1>Status : {response.status}</h1>
        </div>
        <div className="main_form">
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
        </div>
      </div>
    </>
  );
}

export default UserOut;
