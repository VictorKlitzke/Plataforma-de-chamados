const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const authRouters = require("./routes/index")

const app = express();
    app.use(cors())
    app.use(bodyParser.json())
    app.use("/auth", authRouters)


const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando ${PORT}`);
    })