const { Router } = require("express");
const auth = require('../middleware/auth');

const router = Router();

const {saveData, getData} = require("../controller/dataController")

router.post("/api/save", auth, saveData);
router.get("/api/get", auth, getData);

module.exports = router;