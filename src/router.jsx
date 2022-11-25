import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ImgSlider from "./components/header/sliderHeader/ImgSlider";
import UserProvider from "./context/UserContext";
import Main from "./components/main/Main";
import About from "./components/pages/About";
import Login from "./components/pages/Login";
import Movie from "./components/pages/Movie";
import TrailerMovie from "./components/pages/TrailerMovie";
import Profile from "./components/pages/Profile";

export const router = createBrowserRouter([
  {
    element: (
      <UserProvider>
        <App />
      </UserProvider>
    ),
    children: [
      {
        path: "/",
        element: [<ImgSlider />, <Main />],
      },
      {
        path: "/movies/:id",
        element: <Movie />,
      },
      {
        path: "/videos/:id",
        element: <TrailerMovie />,
      },
      {
        path: "/about/",
        element: <About />,
      },
      {
        path: "/login/",
        element: <Login />,
      },
      {
        path: "/profile/",
        element: <Profile />,
      },
    ],
  },
]);
