import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function Login() {
  const location = useLocation();
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(location.pathaname);
    if (location.pathname.includes("code")) {
      let token = location.pathname.split("code=");
      setAuth(token);
      navigate("/");
    }
  }, [location.pathname]);

  return (
    <div>
      {auth === "" ? (
        <button
          onClick={() =>
            (window.location.href = "http://localhost:8000/auth/google")
          }
        >
          Login
        </button>
      ) : (
        <div>
          <button onClick={() => setAuth("")}>Logout</button>
          <Link to="/books">Books</Link>
        </div>
      )}
    </div>
  );
}
