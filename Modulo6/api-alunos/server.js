require('dotenv').config(); // Carrega as variáveis do .env logo no início
const express = require('express');
const connectDB = require('./config/db');
const alunoRoutes = require('./routes/alunoRoutes');

const app = express();

// Middleware para aceitar JSON no corpo das requisições (req.body)
app.use(express.json());

// Conecta ao MongoDB Atlas
connectDB();

// Rotas da API
app.use('/api', alunoRoutes);

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando redondinho na porta ${PORT} 🚀`);
});