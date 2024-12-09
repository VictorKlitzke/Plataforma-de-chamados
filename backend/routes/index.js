const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/index");
const authGet = require("../controllers/gets");

const upload = require('../middleware/index');
const auth = require("../middleware/auth");

// UPDATE
router.put("/updatePassword", auth, authControllers.updatePassword)

// LOGIN e LOGGOUT
router.post("/login", authControllers.login);
router.post("/logout", auth, authControllers.logout);

// CADASTROS
router.post("/registerCalled", auth, upload.array('attachments', 10), authControllers.registerCalled);

// LISTAS
router.get("/listCalled", auth, authGet.getCalled)

module.exports = router