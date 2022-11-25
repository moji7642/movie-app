import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { apiKey } from "../api";
import { mench } from "../components/services/mench";

export const UserContext = createContext({ user: {}, session: "" });

export default function UserProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [session, setSession] = useState(() => localStorage.getItem("session"));
  const location = useLocation();

  async function getUserInfo() {
    const { data } = await mench.get(`account`);
    // console.log(data);
    const movieResult = await mench.get(`account/${data.id}/favorite/movies`);

    setFavoriteMovies(movieResult.data.results);
    setUser(data);
  }

  useEffect(() => {
    console.log(session);
    if (session) {
      localStorage.setItem("session", session);
      window.mench.defaults.params.session_id = session;
      getUserInfo();
      console.log(location.pathname);
      if (location.pathname.includes("login")) {
        console.log("LOGIN");
        navigate("/profile", { replace: true });
      }
    }
  }, [session]);
  function handleLogout() {
    setUser({});
    setSession(null);
    localStorage.clear();
    delete window.mench.defaults.params.session_id;
    toast.success("Successfully logged out!");
  }

  async function login(username, password) {
    try {
      const tokenResult = await mench.get(`authentication/token/new`);

      const authorize = await mench.post(
        `authentication/token/validate_with_login`,
        {
          username,
          password,
          request_token: tokenResult.data.request_token,
        }
      );
      const session = await mench.post(`authentication/session/new`, {
        request_token: tokenResult.data.request_token,
      });
      setSession(session.data.session_id);
      toast.success("Successfully logged in!");
    } catch {
      toast.error("Invalid User or Pass!");
    }
  }

  return (
    <UserContext.Provider
      value={{ user, login, session, handleLogout, favoriteMovies }}
    >
      {children}
    </UserContext.Provider>
  );
}
