import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiKey, baseUrl } from "../api";

export const UserContext = createContext({ user: {}, session: "" });

export default function UserProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [session, setSession] = useState(() => localStorage.getItem("session"));
  async function getUserInfo() {
    const { data } = await axios.get(
      `${baseUrl}/account?api_key=${apiKey}&session_id=${session}`
    );
    setUser(data);
  }

  useEffect(() => {
    if (session) {
      getUserInfo();
    }
  }, [session]);
  function handleLogout() {
    setUser({});
    setSession(null);
    localStorage.clear();
  }

  async function login(username, password) {
    try {
      const tokenResult = await axios.get(
        `${baseUrl}/authentication/token/new?api_key=${apiKey}`
      );

      const authorize = await axios.post(
        `${baseUrl}/authentication/token/validate_with_login?api_key=${apiKey}`,
        {
          username,
          password,
          request_token: tokenResult.data.request_token,
        }
      );
      const session = await axios.post(
        `${baseUrl}/authentication/session/new?api_key=${apiKey}`,
        {
          request_token: tokenResult.data.request_token,
        }
      );
      setSession(session.data.session_id);
      localStorage.setItem("session", session.data.session_id);
      navigate("/", {
        replace: true,
      });
    } catch {
      toast.error("Invalid User or Pass!");
    }
  }

  return (
    <UserContext.Provider value={{ user, login, session, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
}
