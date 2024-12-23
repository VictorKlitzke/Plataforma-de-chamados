const pool = require("../database/index")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
    const { username, password } = req.body;

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
            return res.status(401).json({ error: "Senha incorreta" });
        }

        const token = jwt.sign({ id: user.id }, process.env.TOKEN, { expiresIn: "3h" });

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 18000000
        })

        return res.json({ authorization: true, message: "Login realizado com sucesso", UserId: user.id });

    } catch (error) {
        console.error("Erro ao realizar login:", error.message);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
};

exports.logout = async (req, res) => {
    const token = req.cookies['token']
    console.log(req.cookies['token']);

    if (token) {
        res.cookie('token', '', { expires: new Date(0), path: '/' });
    }
    res.status(200).json({ authorization: false, message: 'Logout realizado com sucesso' });
}

exports.registerCalled = async (req, res) => {
    const { title, description, priority, category } = req.body;

    const token = req.cookies['token'];
    const decoded = jwt.verify(token, process.env.TOKEN);
    const userId = decoded.id;

    if (!title || !description || !priority || !userId || !category) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const status = 'Aberto';
    const attachments = req.files || [];
    const connection = await pool.getConnection();

    try {

        await connection.beginTransaction();

        const queryCalled = `
            INSERT INTO calleds (title, description, priority, status, user_id, category)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await connection.execute(queryCalled, [title, description, priority.trim(), status, userId, category]);
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

        res.status(201).json({ authorization: true, message: 'Chamado criado com sucesso!', calledId });

    } catch (error) {
        console.error("Erro ao criar chamado:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
};

exports.updatePassword = async (req, res) => {
    const { newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "As senhas não coincidem." });
    }

    const token = req.cookies["token"];
    if (!token) {
        return res.status(401).json({ message: "Token não fornecido." });
    }
    const decoded = jwt.verify(token, process.env.TOKEN);
    const userId = decoded.id;
    if (!userId) {
        return res.status(401).json({ message: "Token inválido." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const queryUpdate = `UPDATE users SET password = ? WHERE id = ?`;
        await connection.query(queryUpdate, [hashedPassword, userId]);

        await connection.commit();

        res.status(200).json({ message: "Senha atualizada com sucesso!" });
    } catch (error) {
        await connection.rollback();
        console.error("Erro ao atualizar senha:", error);
        res.status(500).json({ message: "Erro interno ao atualizar senha." });
    } finally {
        connection.release();
    }
};
