import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get("/auth/profile");
        console.log(res);
        setUser(res?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        currentItem,
        setCurrentItem,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
