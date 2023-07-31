import React, { useState } from "react";
import { UserContext } from "../UserContext";
import Component2 from "./Component2";

const Component1 = () => {

  const [user, setUser] = useState({ 
    id: 100, 
    name: "TanvirFaisal", 
    city:"Rajshahi" 
  });
 
  return (
    <UserContext.Provider value={{ user}}>
      <Component2 />
    </UserContext.Provider>
  );
};
export default Component1;