import axios from "axios";

const sessionId = localStorage.getItem("session");
export const mench = axios.create({
  baseURL: "https://api.themoviedb.org/3/",

  params: {
    api_key: "a9ca9139988d08ab7c1c64b4c516f719",
    ...(sessionId && { session_id: sessionId }),
  },
});

window.mench = mench;
