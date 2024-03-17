const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
require("dotenv").config();
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

const DBconnection = require("./DB/connection");
app.use(express.json());
DBconnection();

app.use("/api/student", require("./routes/students"));
app.use("/api/school", require("./routes/school"));
app.use("/api/teacher", require("./routes/teacher"));
app.use("/api/gt", require("./routes/GT"));
app.listen(port, () => {
  console.log(`App is listen on http://localhost:${port}`);
});
