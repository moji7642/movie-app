import React from "react";
import { useState } from "react";
import LogoNav from "./LogoNav";
import MenuNav from "./MenuNav";
import SearchNav from "./SearchNav";
import SubscriptionNav from "./SubscriptionNav";

export default function Nav() {
  const [menu, openMenu] = useState(false);
  return (
    <div className="mx-auto">
      <div className="overflow-hidden py-4 px-6  bg-gradient-to-b from-black  text-lg flex justify-between items-center uppercase fixed w-full z-20">
        <div className="flex gap-8 items-center">
          <LogoNav/>
          <MenuNav/>
          <button className="block lg:hidden text-2xl z-50" onClick={() => openMenu(!menu)}><i class={menu ? "bi bi-x-lg" : "bi bi-list"}></i></button>
        </div>
        <div className="flex gap-4">
          <SearchNav/>
          <SubscriptionNav/>
        </div>
      </div>
      <ul className={`z-10 bg-slate-800 h-full w-2/4 flex flex-col justify-center items-center absolute top-0 left-0 gap-12 ${menu ? "translate-0" : "translate-full"} transition-all duration-500 lg:hidden`} style={{translate : menu ? "0%" : "-100%"}}>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/">Series</a>
        </li>
        <li className="text-sky-400">
          <a href="/">Categories</a>
        </li>
        <li>
          <a href="/">About</a>
        </li>
        <li>
          <a href="/">News</a>
        </li>
      </ul>
    </div>
  );
}
