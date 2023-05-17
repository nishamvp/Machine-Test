const { Router } = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("../node_modules/uuid");
const UserModel = require("../models/UserModel");

const router = Router();

const myuniqueid = uuidv4();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, myuniqueid + Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    const name = req.body.name;
    const password = req.body.password;
    const address = req.body.address;

    var file;

    if (req.file) {
      file = "http://localhost:5000/" + req.file.path;
    } else {
      file = "";
    }

    UserModel.create({ name, password, address, file })
      .then(() => res.set(201).send("Added Succesfully"))
      .catch((err) => console.log(err));
    res.send('Signup Succesfull');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error uploading file");
  }
});

module.exports = router;
