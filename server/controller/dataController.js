const DataModel = require("../models/DataModel");

module.exports.saveData = async (req, res) => {
  const { content } = req.body;
  const { name } = req.body;
  DataModel.create({ content, name })
    .then(() => {
      res.json({ message: "Added Successfully" });
    })
    .catch((err) => console.log(err));
};

module.exports.getData = async (req, res) => {
  const { name } = req.body;
  const data = await DataModel.find({name: name});
  res.json(data);
};

module.exports.deleteData = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  DataModel.findByIdAndDelete(id)
    .then(() => {
      res.json({ message: "Deleted Successfully!" });
    })
    .catch((err) => console.log(err));
};

module.exports.editData = async (req, res) => {
  const { id, content } = req.body;
  console.log(id);
  DataModel.findByIdAndUpdate(id, {content: content})
    .then(() => {
      res.json({ message: "Edited Successfully!" });
    })
    .catch((err) => console.log(err));
};
