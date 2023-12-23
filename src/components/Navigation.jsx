import React from "react";
import "../styles/navigation.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateActiveRoute } from "../store/pokemon";

const Navigation = () => {
  const dispatch = useDispatch();
  const { activeRoute } = useSelector((state) => state.pokemon);
  return (
    <section className="navigation-main">
      <div className="navigation">
        <ul>
          <Link
            to="/"
            id="home"
            className={activeRoute === "/" ? "active" : ""}
            onClick={() => dispatch(updateActiveRoute("/"))}
          >
            <li>
              Home 
            </li>
          </Link>
        </ul>
      </div>
    </section>
  );
};

export default Navigation;
