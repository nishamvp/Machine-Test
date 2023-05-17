const { Router } = require("express");
const multer = require('multer')
const { v4: uuidv4 } = require('../node_modules/uuid');
const RequestModel = require("../models/RequestModel");
const auth = require("../middleware/auth");

const router = Router();

const myuniqueid = uuidv4();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, myuniqueid + Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", auth, upload.single('file'), async (req, res, next) => {
    try {
      const title = req.body.title;
      const name = req.body.name;
      const phone = req.body.phone;
      const email = req.body.email;
      const description = req.body.description;
      const date = req.body.date;
      const incoming = req.body.incoming;
      const refno = req.body.refno;
      var file
      if(req.file){
        file = "http://localhost:5000/"+req.file.path;
      }
      else {
        file = "";
      }
      
      RequestModel
        .create({ title, name, phone, email, description, date, incoming, file, refno })
        .then(()=> res.set(201).send("Added Succesfully"))
        .catch((err)=> console.log(err));
      //res.send('File uploaded successfully');
    
    } catch (err) {
      console.error(err);
      res.status(500).send('Error uploading file');
    }
  });



module.exports = router;