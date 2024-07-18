const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const name = req.body.name;
  if (!name) {
    return res.end("Hello there stranger");
  }
  res.end(`Hello there ${name}`);
});

module.exports = router;
