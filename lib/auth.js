import React, { useState, useEffect, useContext, createContext } from "react";
import nookies from "nookies";
import firebaseClient from "./firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";

import { createUser } from "./db";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  firebaseClient();
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      // console.log("auth changed");
      // // console.log(user ? user.id : "Nothing");
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", {});
        return;
      }

      const token = await user.getIdToken();
      setUser(user);
      nookies.set(undefined, "token", token, {});
      const formattedUser = formatUser(user);
      setUser(formattedUser);
      console.log(formattedUser);
      createUser(user.uid, user.email);
      // console.log(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
  };
};

export const useAuth = () => useContext(AuthContext);
