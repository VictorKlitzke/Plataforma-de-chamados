const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/index");
const authGet = require("../controllers/gets");
const upload = require('../middleware/index');

router.post("/login", authControllers.login)
router.post("/registerCalled", upload.array('attachments', 10), authControllers.registerCalled)

router.get("/listCalled", authGet.getCalled)

module.exports = router