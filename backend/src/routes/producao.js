const express = require("express");

const router = express.Router();

const db = require("../database");


// LISTAR PRODUÇÕES
router.get("/", (req,res)=>{


    const sql = `

        SELECT

            p.*,

            m.nome AS maquina_nome

        FROM producao p

        INNER JOIN maquina m

        ON p.maquina_id = m.id_maquina

    `;


    db.query(sql,(err,resultado)=>{


        if(err){

            return res.status(500).json({
                erro:err
            });

        }


        res.json(resultado);


    });


});



// CADASTRAR PRODUÇÃO
router.post("/",(req,res)=>{


    const {

        produto,

        quantidade_produzida,

        quantidade_esperada,

        data_producao,

        maquina_id,

        status


    } = req.body;



    const sql = `

        INSERT INTO producao

        (

            produto,

            quantidade_produzida,

            quantidade_esperada,

            data_producao,

            maquina_id,

            status

        )

        VALUES (?,?,?,?,?,?)

    `;



    db.query(

        sql,

        [

            produto,

            quantidade_produzida,

            quantidade_esperada,

            data_producao,

            maquina_id,

            status

        ],


        (err,resultado)=>{


            if(err){

                return res.status(500).json({
                    erro:err
                });

            }



            res.status(201).json({

                mensagem:"Produção cadastrada!",

                id:resultado.insertId

            });


        }


    );


});




// ATUALIZAR PRODUÇÃO
router.put("/:id",(req,res)=>{


    const id = req.params.id;


    const {

        produto,

        quantidade_produzida,

        quantidade_esperada,

        data_producao,

        maquina_id,

        status


    } = req.body;



    const sql = `

        UPDATE producao SET

            produto = ?,

            quantidade_produzida = ?,

            quantidade_esperada = ?,

            data_producao = ?,

            maquina_id = ?,

            status = ?

        WHERE id_producao = ?

    `;



    db.query(

        sql,

        [

            produto,

            quantidade_produzida,

            quantidade_esperada,

            data_producao,

            maquina_id,

            status,

            id

        ],


        (err,resultado)=>{


            if(err){

                return res.status(500).json({
                    erro:err
                });

            }


            res.json({

                mensagem:"Produção atualizada!"

            });


        }


    );


});




// EXCLUIR PRODUÇÃO
router.delete("/:id",(req,res)=>{


    const id = req.params.id;



    const sql = `

        DELETE FROM producao

        WHERE id_producao = ?

    `;



    db.query(

        sql,

        [id],


        (err,resultado)=>{


            if(err){

                return res.status(500).json({
                    erro:err
                });

            }



            res.json({

                mensagem:"Produção removida!"

            });


        }


    );


});



module.exports = router;