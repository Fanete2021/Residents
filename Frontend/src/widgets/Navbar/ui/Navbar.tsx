import "./Navbar.scss";
import {Link} from "react-router-dom";
import React from "react";

export const Navbar = () => {
  return (
    <div className={'navbar'}>
      <div className={'navbar__links'}>
        <Link to={'/'}>Главная</Link>
      </div>
    </div>
  );
};
