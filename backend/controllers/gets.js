const pool = require("../database/index")
require("dotenv").config();

exports.getCalled = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM calleds');
        return res.status(200).json({ chamados: rows });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao consultar os chamados', error: error });
    }
}