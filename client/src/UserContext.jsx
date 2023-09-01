import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
 

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get("/auth/profile");
        setUser(data);
      } catch (error) {
        const errMsg = error.response.data.msg;
        console.log(error);
        toast.error(errMsg);
      }
    };

    if (!user) {
      getProfile();
    }
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
