function ToCapitalizeWord(str) {
  if (!str) {
    return "";
  }
  str = str.trim();
  str = str.toLowerCase();
  str = str[0].toUpperCase() + str.slice(1);
  return str;
}

export default ToCapitalizeWord;
