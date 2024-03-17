const mongoose = require("mongoose");
const dbURI = "mongodb://127.0.0.1:27017/Potion_Tracker";
function DBconnection() {
  mongoose
    .connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connection Successfuly");
    })
    .catch((err) => {
      console.log("error : " + err);
    });
}
module.exports = DBconnection;
