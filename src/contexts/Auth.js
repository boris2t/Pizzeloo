import React, { useEffect, useState } from "react";
import fire from "../fire";
import Spinner from "../components/common/spinner";
import checkAdmin from "../functions/checkAdmin";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    fire.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const isAdmin = await checkAdmin(user)
        user['isAdmin'] = isAdmin
      }
      setCurrentUser(user)
      setPending(false)
    });
  }, []);

  if(pending){
    return <Spinner />
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};