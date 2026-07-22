const express = require("express");

const router = express.Router();

const db = require("../database");


// LISTAR PRODUÇÕES
router.get("/", async (req, res) => {

    try {

        const [producoes] = await db.query(
            "SELECT * FROM producao"
        );

        res.json(producoes);

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao buscar produções"
        });

    }

});


// CADASTRAR PRODUÇÃO
router.post("/", async (req, res) => {

    try {

        const {
            produto,
            quantidade_produzida,
            quantidade_esperada,
            data_producao,
            maquina_id,
            status
        } = req.body;


        const [resultado] = await db.query(

            `INSERT INTO producao
            (
                produto,
                quantidade_produzida,
                quantidade_esperada,
                data_producao,
                maquina_id,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?)`,

            [
                produto,
                quantidade_produzida,
                quantidade_esperada,
                data_producao,
                maquina_id,
                status
            ]

        );


        res.json({
            mensagem: "Produção cadastrada",
            id: resultado.insertId
        });


    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao cadastrar produção"
        });

    }

});


// EXCLUIR PRODUÇÃO
router.delete("/:id", async (req,res)=>{

    try{

        await db.query(
            "DELETE FROM producao WHERE id = ?",
            [req.params.id]
        );


        res.json({
            mensagem:"Produção removida"
        });


    }catch(erro){

        console.error(erro);

        res.status(500).json({
            erro:"Erro ao excluir"
        });

    }

});


module.exports = router;