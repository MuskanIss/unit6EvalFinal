import React, { useEffect } from "react";
import { useContext } from "react";
import Book from "./Book";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";

export default function Books() {
  const contextObj = useContext(AuthContext);
  const { books, setBooks, title, setTitle, imgURL, setImageURL } = contextObj;
  const add = async () => {
    setImageURL("");
    setTitle("");
    await axios
      .post(
        `http://localhost:8000/books`,
        { title: title, book_front_image_url: imgURL },
        {
          headers: {
            accessToken: "Bearer " + localStorage.getItem("auth"),
          },
        }
      )
      .catch((err) => console.log(err.message));

    fetch("http://localhost:8000/books")
      .then((res) => res.json())
      .then((res) => {
        setBooks((prev) => [...res]);
        console.log(res);
      });
  };
  useEffect(() => {
    console.log("bookks");
  }, [books]);
  return (
    <div>
      Books
      <h2>ADD</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <input
        type="text"
        value={imgURL}
        onChange={(e) => setImageURL(e.currentTarget.value)}
      />
      <button onClick={() => add()}>Submit</button>
      {books.map((b) => {
        return <Book book={b} />;
      })}
    </div>
  );
}
