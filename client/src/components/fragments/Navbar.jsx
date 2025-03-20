import React from "react";
import { Link } from "react-router";

export default function Navbar() {
  function toggleMenu() {
    const menus = document.querySelectorAll("#mobile-menu-items"); // Select all elements with that ID
    menus.forEach((menu) => {
      if (menu.classList.contains("hidden")) {
        menu.classList.add("flex");
        menu.classList.remove("hidden");
      } else {
        menu.classList.add("hidden");
        menu.classList.remove("flex");
      }
    });
  }

  return (
    <div className="w-full max-w-[1200px] py-1 grid grid-cols-1 md:grid-cols-3">
      <div className="w-full px-2 flex flex-row justify-between items-center">
        <div className="w-fit">
          <img src="/vite.svg" alt="logo" width={40} height={40} />
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>menu</button>
        </div>
      </div>
      <div
        id="mobile-menu-items"
        className="w-full z-10 md:w-fit hidden px-2 md:px-0 bg-background md:flex flex-col md:flex-row"
      >
        <ul className="w-full flex flex-col md:flex-row justify-center items-center gap-4">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/Features">Features</Link>
          </li>
          <li>
            <Link to="/Support">Support</Link>
          </li>
        </ul>
      </div>
      <div
        id="mobile-menu-items"
        className="w-full z-10 hidden px-2 md:px-0 bg-background md:flex justify-center items-center"
      >
        <ul className="w-full flex flex-row justify-center items-center gap-4">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">sign up</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
