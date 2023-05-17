const { Router } = require("express");
const auth = require('../middleware/auth');

const router = Router();

const {saveUser, getUser, validate, getUserProfile} = require("../controller/UserController")

router.post("/api/register", saveUser);
router.post("/api/login", getUser);
router.post("/api/profile", auth, getUserProfile);
router.get("/api/validate", validate);

module.exports = router;