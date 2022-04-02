import logo from "./logo.svg";
import "./App.css";
import Router from "./components/Router";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthProvider";

function App() {
  const location = useLocation();
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname.includes("code")) {
      let token = location.pathname.split("code=")[1];
      setAuth(token);
      navigate("/");
    }
  }, [location.pathname]);
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
