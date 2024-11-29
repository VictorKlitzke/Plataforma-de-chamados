const pool = require("../database/index")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
    const {username, password} = req.body;

    try {

        const [rows] = await pool.query("SELECT * FROM users WHERE name = ?", [username]);

        if (!rows || rows.length === 0) {
            return res.status(401).json({ error: "Usuário ou senha inválidos" });
        }

        const user = rows[0];

        if (!user.password) {
            return res.status(500).json({ error: "Senha não encontrada para o usuário" });
        }
        user.password = user.password.replace("$2y$", "$2a$");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Usuário ou senha inválidos" });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.TOKEN, { expiresIn: "1h" });
        res.json({ message: "Login realizado com sucesso", token });

    } catch (error) {
        console.error("Erro ao realizar login:", error.message);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}

exports.registerCalled = async (req, res) => {
    const { title, description, priority } = req.body;

    if (!title || !description || !priority) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const validPriorities = ['Baixa', 'Média', 'Alta'];
    if (!validPriorities.includes(priority)) {
        return res.status(400).json({ message: 'Prioridade inválida.' });

    }

    const userId = 203;
    const status = 'Aberto';
    const attachments = req.files || [];
    const connection = await pool.getConnection();

    try {

        await connection.beginTransaction();

        const queryCalled = `
            INSERT INTO calleds (title, description, priority, status, user_id)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await connection.execute(queryCalled, [title, description, priority, status, userId]);
        const calledId = result.insertId;

        if (attachments.length > 0) {
            const queryAttachment = `
                INSERT INTO attachments (called_id, file_path)
                VALUES (?, ?)
            `;
            for (const file of attachments) {
                const filePath = `/uploads/${file.filename}`;
                await connection.execute(queryAttachment, [calledId, filePath]);
            }
        }

        await connection.commit()

        res.status(201).json({ message: 'Chamado criado com sucesso!', calledId });

    } catch (error) {
        console.error("Erro ao criar chamado:", error.message);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
};
