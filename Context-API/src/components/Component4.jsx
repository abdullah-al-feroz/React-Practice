import React, { useContext } from "react";
import { UserContext } from "../UserContext";

const Component4 = () => {
const { user} = useContext(UserContext);

  return (
    <div>
      {/* <h2>{text}</h2> */}
      <h3>ID: {user.id}</h3>
      <h3>Name: {user.name}</h3>
      <h3>City: {user.city}</h3>
    </div>
  );
};

export default Component4;