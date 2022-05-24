import { useState } from "react";
import Game from "./components/Game";
import Home from "./components/Home";



function App() {

  const [isGame, setIsGame] = useState(false);
  const [is2Players, setIs2Players] = useState(false);
  const [isP1X, setIsP1X] = useState(false);

  return isGame ?
    <Game is2Players={is2Players} isP1X={isP1X} /> :
    <Home
      setIsGame={setIsGame}
      setIs2Players={setIs2Players}
      isP1X={isP1X} setIsP1X={setIsP1X} />
}

export default App;
