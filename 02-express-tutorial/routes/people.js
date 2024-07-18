const express = require("express");
const router = express.Router();
let { people } = require(".././data");
const {
  getPeople,
  updatePerson,
  createPerson,
  createPersonPostman,
  deletePerson,
} = require("../controllers/people");

// routers with controllers, first approach (looks cleaner to me!)

// router.get("/", getPeople);
// router.post("/", createPerson);
// router.post("/postman", createPersonPostman);
// router.put("/:id", updatePerson);
// router.delete("/:id", deletePerson);

// second approach
router.route("/").get(getPeople).post(createPerson);
router.route("/postman").post(createPersonPostman);
router.route("/:id").put(updatePerson).delete(deletePerson);

module.exports = router;
