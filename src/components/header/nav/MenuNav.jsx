import React from "react";
import { NavLink } from "react-router-dom";

export default function MenuNav() {
  return (
    <ul className="hidden lg:flex gap-4 items-center">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="">Series</NavLink>
      </li>
      <li className="text-sky-400">
        <NavLink to="">Categories</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="">News</NavLink>
      </li>
    </ul>
  );
}
