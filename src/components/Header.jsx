import React from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateActiveRoute } from "../store/pokemon";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <section className="header-main">
      <div className="header">
        <Link to="/" onClick={() => dispatch(updateActiveRoute("/"))}>
          <div className="header-left">
            <div className="header-img">
              <img src="/Pokeball.svg" alt="" />
            </div>
            <p>Pokédex</p>
          </div>
        </Link>

        <div className="header-right">
          <a target="_blank" href="https://github.com/Abhijeet6387">
            Github/Repository
          </a>
        </div>
      </div>
      <div className="divider"></div>
    </section>
  );
};

export default Header;
