function FilterObj(data) {
  let newOBJ = {};
  for (let i in data) {
    if (data[i] !== "" && data[i] !== undefined) {
      newOBJ[i] = data[i];
    }
  }
  return newOBJ;
}

module.exports = FilterObj;
