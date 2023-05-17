const { Router } = require("express");
const auth = require('../middleware/auth');

const router = Router();

const {saveData, getData, deleteData, editData} = require("../controller/dataController")

router.post("/api/save", auth, saveData);
router.post("/api/get", auth, getData);
router.post("/api/delete", auth, deleteData);
router.post("/api/edit", auth, editData);

module.exports = router;