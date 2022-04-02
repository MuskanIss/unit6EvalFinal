import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function Book({ book }) {
  const { title, setTitle, imgURL, setImageURL, setBooks } =
    useContext(AuthContext);
  const [edited, setEdited] = React.useState(false);
  const edit = async () => {
    await axios
      .patch(
        `http://localhost:8000/books/${book._id}`,
        { title: title },
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
    setEdited(false);
    setTitle("");
  };
  const deleted = async () => {
    await axios
      .delete(`http://localhost:8000/books/${book._id}`, {
        headers: {
          accessToken: "Bearer " + localStorage.getItem("auth"),
        },
      })
      .catch((err) => console.log(err.message));
    fetch("http://localhost:8000/books")
      .then((res) => res.json())
      .then((res) => setBooks((prev) => [...res]));
  };
  return (
    <div style={{ border: "1px solid black" }}>
      <div>
        {edited ? (
          <>
            <input
              placeholder="add title"
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <button onClick={edit}>submit</button>
          </>
        ) : (
          <div>{book.title}</div>
        )}

        <div>
          <img src={book.book_front_image_url} />
        </div>
        <button
          onClick={() => {
            setTitle(book.title);
            setEdited(true);
          }}
        >
          Edit
        </button>
        <button onClick={deleted}>Delete</button>
      </div>
    </div>
  );
}
