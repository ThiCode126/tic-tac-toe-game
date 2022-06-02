import React from "react";

import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as IconX } from "../assets/icon-x.svg";
import { ReactComponent as IconO } from "../assets/icon-o.svg";

const Home = ({ isP1X, setIs2Players, setIsGame, setIsP1X }) => {
  const setNewGame = (type) => {
    if (type === "cpu") {
      setIs2Players(false);
    } else if (type === "2players") {
      setIs2Players(true);
    }
    setIsGame(true);
  };

  return (
    <section id="home">
      <div className="cw">
        <div className="header">
          <Logo />
        </div>
        <div className="body">
          <h2 className="heading-xs">Pick Player 1's mark</h2>
          <div className={`toggle-mark ${isP1X ? "mark-x" : "mark-o"}`}>
            <div className="icon icon-x" onClick={() => setIsP1X(true)}>
              <IconX />
            </div>
            <div className="icon icon-o" onClick={() => setIsP1X(false)}>
              <IconO />
            </div>
          </div>
          <span className="remember body-text">remember : x goes first</span>
        </div>
        <div className="footer">
          <button
            className="primary yellow heading-xs"
            onClick={() => setNewGame("cpu")}
          >
            new game (vs cpu)
          </button>
          <button
            className="primary blue heading-xs"
            onClick={() => setNewGame("2players")}
          >
            new game (vs Player)
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
