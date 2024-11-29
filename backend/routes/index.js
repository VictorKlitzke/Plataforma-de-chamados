const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/index");
const authGet = require("../controllers/gets");

const upload = require('../middleware/index');
const auth = require("../middleware/auth");

router.post("/login", authControllers.login)
router.post("/registerCalled", upload.array('attachments', 10), auth, authControllers.registerCalled)

router.get("/listCalled", auth, authGet.getCalled)

module.exports = router