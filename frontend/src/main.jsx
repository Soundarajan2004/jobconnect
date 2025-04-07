import React, { createContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import axios from 'axios';

axios.defaults.baseURL = `${import.meta.env.VITE_SERVER_URL}/api`;

export const Context = createContext({
  isAuthorized: false,
});

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/user/getuser", {
          withCredentials: true,
        });
        setIsAuthorized(true);
        setUser(data.user);
      } catch (err) {
        setIsAuthorized(false);
        setUser({});
      }
    };
    fetchUser();
  }, []);

  return (
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
