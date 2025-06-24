"use client";

import {useState, useEffect } from "react";
import UserContext from "./userContext";
import axios from "axios";


const UserProvider = ({children})=>{
    const [user,setUser] = useState(undefined);

    useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/currentUser");
        if (res.status === 200) {
          console.log("user data", res.data);
          setUser(res.data);
        } else {
          toast.error("Failed to fetch user data");
          setUser(null);
        }
      } catch (error) {
        console.log("error in user provider", error);
        setUser(null);
      }
    };

    if (user === undefined) {
      fetchUser();
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </>
  );
}

export default UserProvider;