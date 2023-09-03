import React, { useState, useEffect } from "react";
import logo from "../assets/img/logo.webp";
import { Navigate } from "react-router-dom";

const LogoAnimation = () => {
  const [redirect, setRedirect] = useState(false);

  const handleScreenClick = () => {
    setRedirect(true);
  };

  return (
    <div className={`logo-animation `} onClick={handleScreenClick}>
      <img src={logo} alt="Marvel Logo" />

      {redirect && <Navigate to="/home" />}
    </div>
  );
};

export default LogoAnimation;
