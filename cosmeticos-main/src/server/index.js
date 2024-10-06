const express = require('express');
const Sequelize = require('sequelize');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const sequelize = new Sequelize('cosmeticos', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql'
});

const contato = sequelize.define('contatos', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data_nascimento: {
        type: Sequelize.DATE,
        allowNull: false
    },
    estado: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    produto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    marca: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mensagem: {
        type: Sequelize.TEXT,
        allowNull: false
    },
}, {
    timestamps: false,
    freezeTableName: true,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

contato.sync({force: false});

app.post('/', async(req, res) => {
    try{
        const {nome,email,telefone,data_nascimento,estado,cidade,produto,marca,mensagem} = req.body;
        const colunas = await contato.create({nome,email,telefone,data_nascimento,estado,cidade,produto,marca,mensagem});
        
        return res.status(201).json();
    }
    catch (err){
        console.error(err)
    }
})

app.listen(8000, () =>{
    console.log('Rodando, graças a Deus!')
});