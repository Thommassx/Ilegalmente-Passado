const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "senai",
    database: "ecofactory"
});

connection.connect((err)=>{
    if(err){
        console.log("Erro ao conectar:", err);
        return;
    }

    console.log("Banco conectado!");
});


module.exports = connection;