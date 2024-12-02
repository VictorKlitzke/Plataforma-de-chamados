require('dotenv').config();

const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const authRouters = require("./routes/index")

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
    credentials: true,
};

const app = express();
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(cookieParser());
app.use("/auth", authRouters)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando ${PORT}`);
})