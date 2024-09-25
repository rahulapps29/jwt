const { BadRequest, Unauthenticated } = require("../errors/index");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequest("batao ji");
  }

  if (password !== "Secret@123" || username !== "Rahul") {
    throw new BadRequest("sahi batao ji");
  }

  //demo data
  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(StatusCodes.OK).json({ msg: "Sahi Hai", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(StatusCodes.OK).json({
    msg: `Hello, ${req.user.username} `,
    secret: `Your secret is -- ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
