import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import Swal from "sweetalert2";

// Step 1: Context তৈরি করো
const Allcontext = createContext();
const provider = new GoogleAuthProvider();

// Step 2: Provider component তৈরি করো
const AllContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      // setUser(currentUser);
      // setLoading(false);
      // if (currentUser?.email) {
      //   const userdata = { email: currentUser.email };
      //   axios
      //     .post("https://service-sharing-server-bay.vercel.app/jwt", userdata)
      //     .then((res) => {
      //       console.log("token", res.data.token);
      //       const token = res.data.token;
      //       localStorage.setItem("token:", token);
      //     })
      //     .catch((error) => console.log(error));
      // }
      console.log("currentuser", currentUser);
    });
    return () => unsubscribe();
  }, []);

  const googlepopup = () => {
    return signInWithPopup(auth, provider);
  };

  const handlesignout = () => {
    return signOut(auth);
  };
  const createusersignup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const createuserlogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const value = {
    createusersignup,
    createuserlogin,
    user,
    handlesignout,
    googlepopup,
    loading,
    setLoading,
  };

  return <Allcontext.Provider value={value}>{children}</Allcontext.Provider>;
};

// Step 3: Custom Hook বানাও useContext এর জন্য
export const useAllContext = () => useContext(Allcontext);

// Step 4: Export Provider
export default AllContextProvider;
