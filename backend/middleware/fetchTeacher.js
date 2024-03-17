const jwt = require("jsonwebtoken");

async function fetchTeacher(req, res, next) {
  const token = await req.header("token");
  if (!token) {
    res.status(401).send({ error: "wrong token have" });
  }
  try {
    const data = await jwt.verify(token, process.env.JWT_KEY);

    req.user = data;
    // console.log(await jwt.decode(token, process.env.JWT_KEY));

    req.body.staffID = data.staffID;
    next();
  } catch (err) {
    res.status(401).send({ error: "wrong token have" });
  }
}
module.exports = fetchTeacher;
