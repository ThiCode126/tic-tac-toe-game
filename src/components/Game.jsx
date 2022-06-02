import React, { useEffect, useState } from "react";

import { ReactComponent as Logo } from "../assets/logo.svg";
// import { ReactComponent as IconX } from "../assets/icon-x.svg";
// import { ReactComponent as IconO } from "../assets/icon-o.svg";
// import ImgX from "../assets/icon-x.svg";
// import ImgO from "../assets/icon-o.svg";
import ImgX_grey from "../assets/icon-x-grey.svg";
import ImgO_grey from "../assets/icon-o-grey.svg";
import IconRestart from "../assets/icon-restart.svg";
import {
  checkIfTied,
  checkIfWinner,
  initialBox,
  initialScore,
  leftText,
  rightText,
  playCPU,
} from "../utils/data";

const Game = ({ isP1X, is2Players, setIsGame }) => {
  const [isGameX, setIsGameX] = useState(true);
  const [score, setScore] = useState(initialScore);
  const [box, setBox] = useState(initialBox);
  const [winner, setWinner] = useState(false);
  const [isEndGame, setIsEndGame] = useState(false);
  const firstCPU = !is2Players && !isP1X;

  // CPU GAME --> if cpu is x, cpu first player

  useEffect(() => {
    // Si on joue contre le CPU et qu'on à pas les X
    if (firstCPU) {
      console.log("CPU");
      playCPU(initialBox, false, setBox, setIsGameX);
    }
  }, [firstCPU]);

  const handleMove = (id) => {
    if (winner) {
      console.log("Game Over");
      return;
    }
    let newBox = [...box];
    if (newBox[id] === "") {
      if (isGameX) {
        newBox[id] = "x";
      } else {
        newBox[id] = "o";
      }
      console.log(newBox);
      const newWinner = checkIfWinner(newBox);
      const isTied = checkIfTied(newBox);
      let newScore = { ...score };

      setBox(newBox);

      // Winner ?
      if (newWinner) {
        console.log("Winner : " + newWinner);
        setIsEndGame(true);
        setWinner(newWinner);

        if (newWinner === "x") {
          newScore.x++;
        } else {
          newScore.o++;
        }
      } else if (isTied) {
        newScore.ties++;
        setIsEndGame(true);
      } else {
        // Coup Suivant

        // 2Players
        if (is2Players) {
          setIsGameX(!isGameX);
        } else {
          // CPU PLAYER
          console.log("No Winner => CPU");
          const cpuBox = playCPU(newBox, isP1X, setBox, setIsGameX);

          const newWinnerAfterCPU = checkIfWinner(cpuBox);
          const isTiedAfterCPU = checkIfTied(cpuBox);
          if (newWinnerAfterCPU) {
            console.log("Winner : " + newWinnerAfterCPU);
            setIsEndGame(true);
            setWinner(newWinnerAfterCPU);

            if (newWinnerAfterCPU === "x") {
              newScore.x++;
            } else {
              newScore.o++;
            }
          } else if (isTiedAfterCPU) {
            newScore.ties++;
            setIsEndGame(true);
          }
        }
      }

      setScore(newScore);
    }
  };

  const reset = () => {
    setIsGameX(true);
    setBox(initialBox);
  };

  const handleRestartGame = () => {
    if (!winner) {
      console.log("Restart game");
      reset();
      if (!is2Players && !isP1X) {
        console.log("CPU");
        playCPU(initialBox, false, setBox, setIsGameX);
      }
    }
  };
  const handleNextRound = () => {
    reset();
    setWinner(false);
    setIsEndGame(false);

    if (!is2Players && !isP1X) {
      console.log("CPU");
      playCPU(initialBox, false, setBox, setIsGameX);
    }
  };
  const handleQuitGame = () => {
    reset();
    setWinner(false);
    setIsEndGame(false);
    setIsGame(false);
  };

  return (
    <section id="game">
      <div className="cw">
        <div className="header">
          <div className="logo">
            <Logo />
          </div>
          <div className="turn">
            {isGameX ? (
              <img src={ImgX_grey} alt="icon-x" width="20" height="20" />
            ) : (
              <img src={ImgO_grey} alt="icon-o" width="20" height="20" />
            )}
            <span className="heading-xs">turn</span>
          </div>
          <button className="restart" onClick={handleRestartGame}>
            <img src={IconRestart} alt="restart" width="20" height="20" />
          </button>
        </div>
        <div className="body">
          {box.map((item, k) => (
            <div
              key={k}
              className={`box ${item === "" ? "click" : ""}`}
              onClick={item === "" ? () => handleMove(k) : undefined}
            >
              {item === "" && (
                <span
                  className={`icon next next-${isGameX ? "x" : "o"}`}
                ></span>
              )}
              {item === "x" && <span className="icon now-x"></span>}
              {item === "o" && <span className="icon now-o"></span>}
            </div>
          ))}
        </div>
        <div className="footer">
          <div className="case x">
            <p className="body-text">{leftText(isP1X, is2Players)}</p>
            <h4 className="heading-m">{score.x}</h4>
          </div>
          <div className="case ties">
            <p className="body-text">TIES</p>
            <h4 className="heading-m">{score.ties}</h4>
          </div>
          <div className="case o">
            <p className="body-text">{rightText(isP1X, is2Players)}</p>
            <h4 className="heading-m">{score.o}</h4>
          </div>
        </div>
      </div>
      {isEndGame && (
        <div className="modal">
          <div className="in-modal">
            <div className="body">
              {winner === false ? (
                <span className="heading-l">round tied</span>
              ) : (
                <>
                  {is2Players ? (
                    <span className="heading-xs">
                      Player{" "}
                      {winner === "x" &&
                        (isP1X ? <span>1</span> : <span>2</span>)}
                      {winner === "o" &&
                        (isP1X ? <span>2</span> : <span>1</span>)}{" "}
                      wins !
                    </span>
                  ) : isP1X ? (
                    winner === "x" ? (
                      <span className="heading-xs">you won</span>
                    ) : (
                      <span className="heading-xs">oh no, you lost ...</span>
                    )
                  ) : winner === "o" ? (
                    <span className="heading-xs">you won</span>
                  ) : (
                    <span className="heading-xs">oh no, you lost ...</span>
                  )}
                  <div className="winner-desc">
                    <p className={`win-${winner} `}>
                      <span className={`icon icon-${winner}`}></span>
                      <span className="heading-l">takes the round</span>
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="footer">
              <button className="secondary grey" onClick={handleQuitGame}>
                <span className="heading-xxs">quit</span>
              </button>
              <button className="secondary yellow" onClick={handleNextRound}>
                <span className="heading-xxs">next round</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Game;
