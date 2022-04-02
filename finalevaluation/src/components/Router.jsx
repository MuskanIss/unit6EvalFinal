import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Books from "./Books";
import Book from "./Book";
import React from "react";
import Login from "./Login";

export default function Router() {
  return (
    <div>
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<Book />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}
