const { Router } = require("express");

const router = Router();

const {saveUser, getUser, validate} = require("../controller/UserController")

router.post("/api/register", saveUser);
router.post("/api/login", getUser);
router.get("/api/validate", validate);

module.exports = router;