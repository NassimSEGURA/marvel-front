import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/img/logo.webp";
import charactersLinkHero from "../assets/img/charactersLinkHero.png";
import comicsLinkHero from "../assets/img/comicsLinkHero.png";

const Navbar = () => {
  const location = useLocation();
  const pageClass = location.pathname.split("/")[1];
  const isHomePage = pageClass === "home";
  const isComicsPage = pageClass === "comics";
  const isCharactersPage = pageClass === "characters";
  const isFavorisPage = pageClass === "favoris";

  return (
    <div className={`hero hero-${pageClass}`}>
      <nav className={`navbar`}>
        <Link to="/home" className="logo">
          <img src={logo} alt="Marvel Logo" />
        </Link>
        <div className="nav-links">
          <Link to="/comics" className="comics-button">
            Comics{" "}
          </Link>
          <Link to="/characters" className="characters-button">
            {" "}
            Characters
          </Link>
          <Link to="/favoris" className="favoris-button">
            {" "}
            Favoris
          </Link>
          <button className="login-button">Login</button>
          <button className="signup-button">Signup</button>
        </div>
      </nav>
      {isHomePage && (
        <div className="home-images">
          <Link to="/characters" className="image-container">
            <div className="image-container">
              <img
                src={charactersLinkHero}
                alt="Image 1"
                className="home-image"
              />
              <p className="image-text">Characters</p>
            </div>
          </Link>
          <Link to="/comics" className="image-container">
            <div className="image-container">
              <img src={comicsLinkHero} alt="Image 2" className="home-image" />
              <p className="image-text">Comics</p>
            </div>
          </Link>
        </div>
      )}
      {isComicsPage && (
        <div className="navbar-hero-title">
          <h1>Marvel Comics</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur,
            debitis?
          </p>
        </div>
      )}
      {isCharactersPage && (
        <div className="navbar-hero-title">
          <h1>Marvel Characters</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur,
            debitis?
          </p>
        </div>
      )}
      {isFavorisPage && (
        <div className="navbar-hero-title">
          <h1>Marvel Favoris</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur,
            debitis?
          </p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
