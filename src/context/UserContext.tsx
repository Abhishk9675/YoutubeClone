import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../Api/axios";

interface User {
  _id: string;
  username: string;
  email: string;
  fullname: string;
  avatar: string;
  cover: string;
  watchHistory: string[];
}

interface UserContextType {
  user:User|null;
  getUser: () =>Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userDetails, setUserDetails] = useState<User | null>(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    api
      .get("/users/me")
      .then((res) => {
        if (res.data.statusCode === 200) {
          setUserDetails(res.data.data);
        } else {
         setUserDetails(null);
        }
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  };
  return (
    <UserContext.Provider
      value={{
       user:userDetails,
       getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
