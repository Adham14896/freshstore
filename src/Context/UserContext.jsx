import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUserName] = useState(null);
  // async function verifyUser(headers) {
  //   const { data } = await axios.get(
  //     "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
  //     {
  //       headers,
  //     }
  //   );
  //   console.log(data.decoded);
  //   setUserId(data.decoded);
  //   localStorage.setItem("userId", data.decoded);
  //   console.log(userId);
  // }

  async function verifyUser() {
    const headers = {
      token: localStorage.getItem("userToken"),
    };

    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
        {
          headers,
        }
      );
      setUserId(data.decoded.id);
      console.log(userId);
      setUserName(data.decoded.name);

      // Pass the user ID from the token
    } catch (err) {
      console.error(err);
    }
  }

  async function getUserDetails() {
    const headers = {
      token: localStorage.getItem("userToken"),
    };
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/users/`,

      {
        headers,
      }
    );
    console.log(data);
  }

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    }
  }, [userId]);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserData(token);
      verifyUser(); // This will set the userId after verifying the token
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserData(localStorage.getItem("userToken"));
      setUserId(localStorage.getItem("userId"));
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        getUserDetails,
        userData,
        setUserData,
        verifyUser,
        userId,
        setUserId,
        username,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
