const authorize = (req, res, next) => {
  const { user } = req.query;
  console.log("authorize");
  if (user === "john") {
    req.user = { name: "John", id: 3 };
    return next();
  } else {
    res.status(401).send("<h1>Unauthorized</h1>");
  }
};

module.exports = { authorize };
