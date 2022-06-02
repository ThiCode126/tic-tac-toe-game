export const initialScore = {
  x: 0,
  o: 0,
  ties: 0
}

export const initialBox = ["", "", "", "", "", "", "", "", ""]

export const leftText = (isP1X: false, is2Players: false) => {
  if (is2Players) {
    if (isP1X) {
      return "X(P1)";
    } else {
      return "X(P2)";
    }
  } else {
    if (isP1X) {
      return "X(YOU)";
    } else {
      return "X(CPU)";
    }
  }
}
export const rightText = (isP1X: false, is2Players: false) => {
  if (is2Players) {
    if (!isP1X) {
      return "O(P1)";
    } else {
      return "O(P2)";
    }
  } else {
    if (!isP1X) {
      return "O(YOU)";
    } else {
      return "O(CPU)";
    }
  }
}

export const checkIfWinner = (box) => {
  const winningCombinaison = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < winningCombinaison.length; i++) {
    const [a, b, c] = winningCombinaison[i];
    if (box[a] !== "" && box[a] === box[b] && box[a] === box[c]) {
      return box[a];
    }
  }
  return false
}

export const checkIfTied = (box) => {
  for (let i = 0; i < box.length; i++) {
    if (box[i] === "") {
      return false;
    }
  }
  return true
}

export const cpuPlayer = (box, isP1X) => {
  // isP1X ===> true -> CPU o || false -> CPU x
  let emptyBox = [];
  for (let i = 0; i < box.length; i++) {
    if (box[i] === "") {
      emptyBox.push(i);
    }
  }
  if (emptyBox.length > 0) {
    const randomNumber = Math.floor(Math.random() * emptyBox.length);
    const randomBox = emptyBox[randomNumber];
    box[randomBox] = isP1X ? "o" : "x"
  }
  console.log(box);
  return box
}


export const playCPU = (box, isP1X, setBox, setIsGameX) => {
  const cpuBox = cpuPlayer(box, isP1X);
  setBox(cpuBox);
  setIsGameX(isP1X);

  return cpuBox;
};