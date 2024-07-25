const { BadRequest } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequest("Provide valid credentials");
  }

  // demo purposes id, normally provided by DB
  const id = new Date().getTime();

  // just for demo, in prd create long and ungeuessable strings
  // try to keep the payload small for betere UX
  const token = jwt.sign(
    {
      id,
      username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  res.status(200).json({
    msg: "user created",
    token,
  });
};

const dashboard = async (req, res) => {
  console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, lucky number: ${luckyNumber}`,
  });
};

module.exports = {
  dashboard,
  login,
};
