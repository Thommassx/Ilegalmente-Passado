const express = require("express");
const router = express.Router();

const db = require("../database");


// Buscar todas as máquinas
router.get("/", (req, res)=>{

    router.get("/:id", (req,res)=>{

    const id = req.params.id;

    const sql = "SELECT * FROM maquina WHERE id_maquina = ?";

    db.query(sql,[id],(err,resultado)=>{

        if(err){
            return res.status(500).json({
                erro: err
            });
        }


        if(resultado.length === 0){
            return res.status(404).json({
                mensagem:"Máquina não encontrada"
            });
        }


        res.json(resultado[0]);

    });

});

    const sql = "SELECT * FROM maquina";

    db.query(sql, (err, resultado)=>{

        if(err){
            return res.status(500).json({
                erro: err
            });
        }

        res.json(resultado);

    });

});

// Criar uma nova máquina
router.post("/", (req, res) => {

    const {
        nome,
        setor,
        tipo,
        status,
        temperatura,
        energia
    } = req.body;

    const sql = `
        INSERT INTO maquina
        (nome, setor, tipo, status, temperatura, energia)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            nome,
            setor,
            tipo,
            status,
            temperatura,
            energia
        ],
        (err, resultado) => {

            if (err) {
                return res.status(500).json({ erro: err });
            }

            res.status(201).json({
                mensagem: "Máquina cadastrada!",
                id: resultado.insertId
            });

        }
    );

});
// Atualizar máquina
router.put("/:id", (req, res) => {

    const id = req.params.id;

    const {
        nome,
        setor,
        tipo,
        status,
        temperatura,
        energia
    } = req.body;

    const sql = `
        UPDATE maquina
        SET
            nome = ?,
            setor = ?,
            tipo = ?,
            status = ?,
            temperatura = ?,
            energia = ?
        WHERE id_maquina = ?
    `;

    db.query(
        sql,
        [
            nome,
            setor,
            tipo,
            status,
            temperatura,
            energia,
            id
        ],
        (err, resultado) => {

            if (err) {
                return res.status(500).json({ erro: err });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensagem: "Máquina não encontrada"
                });
            }

            res.json({
                mensagem: "Máquina atualizada!"
            });

        }
    );

});
// Deletar máquina
router.delete("/:id", (req,res)=>{

    const id = req.params.id;


    const sql = `
        DELETE FROM maquina
        WHERE id_maquina = ?
    `;


    db.query(
        sql,
        [id],
        (err, resultado)=>{

            if(err){
                return res.status(500).json({
                    erro: err
                });
            }


            if(resultado.affectedRows === 0){
                return res.status(404).json({
                    mensagem:"Máquina não encontrada"
                });
            }


            res.json({
                mensagem:"Máquina removida!"
            });

        }
    );

});
module.exports = router;