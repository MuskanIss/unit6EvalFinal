import React, { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [data, setData] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState();
  const [imgURL, setImageURL] = useState();
  const [auth, setAuth] = useState(localStorage.getItem("auth") || "");

  const getData = () => {
    return data;
  };
  useEffect(() => {
    fetch("http://localhost:8000/books")
      .then((res) => res.json())
      .then((res) => setBooks((prev) => [...res]));
  }, []);
  useEffect(() => {
    localStorage.setItem("auth", auth);
  }, [auth]);
  return (
    <AuthContext.Provider
      value={{
        getData,
        setData,
        isEdit,
        setEdit,
        books,
        setBooks,
        title,
        setTitle,
        imgURL,
        setImageURL,
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
