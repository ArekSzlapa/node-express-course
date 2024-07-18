let { people } = require(".././data");

const getPeople = (req, res) => {
  return res.json({ success: true, data: people }).end();
};

const createPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    res
      .status(400)
      .json({ success: false, message: "please provide name value" });
  }
  res.status(201).json({ success: true, person: name });
};

const createPersonPostman = (req, res) => {
  const { name } = req.body;
  if (!name) {
    res
      .status(400)
      .json({ success: false, message: "please provide name value" });
  }
  res.status(201).json({ success: true, data: [...people, name] });
};

const updatePerson = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((el) => el.id === Number(id));
  if (!person) {
    res.status(404).json({ success: false, message: "Person doesn't exist" });
  } else {
    const newPeople = people.map((person) => {
      if (person.id === Number(id)) {
        person.name = name;
      }
      return person;
    });
    res.status(200).json({ success: true, data: newPeople });
  }
};

const deletePerson = (req, res) => {
  const { id } = req.params;
  const person = people.find((el) => el.id === Number(id));
  if (!person) {
    res.status(404).json({ success: false, message: "Nothing to delete" });
    return res.end();
  } else {
    const filteredArray = people.filter((el) => el.id !== Number(id));
    res.status(200).json({ success: true, data: filteredArray });
  }
};

module.exports = {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson,
};
