import { Menu } from "lucide-react";
import React from "react";
import { NavLink } from "react-router";

export default function Sidenav() {
  function handlemenu() {
    const menu = document.getElementById("menu-list");
    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
      menu.classList.add("flex");
    } else {
      menu.classList.remove("flex");
      menu.classList.add("hidden");
    }
  }

  return (
    <div className="h-fit relative md:min-h-screen bg-accent w-full md:w-[200px]">
      <div className="w-full px-2 py-5 flex flex-row justify-between items-center">
        <div className="w-fit md:w-full text-xl font-bold">
          <p>Username</p>
        </div>
        <div className="w-fit md:hidden">
          <button onClick={handlemenu}>
            <Menu />
          </button>
        </div>
      </div>
      <ul
        id="menu-list"
        className="w-full z-50 md:z-0 bg-background md:bg-accent absolute top-0 translate-y-[67px] md:translate-0 md:relative hidden px-2 md:flex flex-col gap-3 justify-start items-start"
      >
        <li className="w-full">
          <NavLink
            onClick={handlemenu}
            to="/dashboard"
            end // This prevents it from being active on subroutes
            className={({ isActive }) =>
              isActive
                ? "bg-background p-2 w-full block border-b-[2px] rounded-t-md border-text"
                : "p-2 w-full block border-b-[2px] border-text"
            }
          >
            dashboard
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
