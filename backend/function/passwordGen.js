//password generate include 0-'9', A-Z, a-z Alphanumeric
const pass_lenght = 7;
// let password = new Array(6);

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const uppercase = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const lowercase = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

function repeteOnetime() {
  let choose_type = Math.floor(Math.random() * 3) + 1;
  let letters = [];
  if (choose_type === 1) {
    letters = digits;
  } else if (choose_type === 2) {
    letters = uppercase;
  } else if (choose_type === 3) {
    letters = lowercase;
  }

  const seleteindex = Math.floor(Math.random() * letters.length);
  const seletedCharater = letters[seleteindex];
  return seletedCharater;
}

function generatePass() {
  let password = new Array(pass_lenght);
  for (let i = 0; i < pass_lenght; i++) {
    password.push(repeteOnetime());
  }
  let newPassword = password.join("");
  console.log("password is ", newPassword);
  return newPassword;
}

module.exports = generatePass;
