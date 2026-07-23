const express = require("express");

const router = express.Router();

const db = require("../database");


// LISTAR OCORRÊNCIAS
router.get("/", (req,res)=>{


    const sql = "SELECT * FROM seguranca";


    db.query(sql,(err,resultado)=>{


        if(err){

            console.error(err);

            return res.status(500).json({
                erro:"Erro ao buscar ocorrências"
            });

        }


        res.json(resultado);


    });


});





// CADASTRAR OCORRÊNCIA
router.post("/", (req,res)=>{


    const {

        tipo_ocorrencia,
        local,
        data_ocorrencia,
        nivel_risco,
        descricao,
        medida_preventiva

    } = req.body;



    const sql = `

        INSERT INTO seguranca

        (
            tipo_ocorrencia,
            local,
            data_ocorrencia,
            nivel_risco,
            descricao,
            medida_preventiva
        )

        VALUES (?, ?, ?, ?, ?, ?)

    `;



    db.query(

        sql,

        [

            tipo_ocorrencia,
            local,
            data_ocorrencia,
            nivel_risco,
            descricao,
            medida_preventiva

        ],

        (err,resultado)=>{


            if(err){

                console.error(err);

                return res.status(500).json({
                    erro:err
                });

            }



            res.status(201).json({

                mensagem:"Ocorrência cadastrada!",

                id:resultado.insertId

            });


        }


    );


});





// DELETAR OCORRÊNCIA

router.delete("/:id",(req,res)=>{


    const sql = `

        DELETE FROM seguranca

        WHERE id_seguranca = ?

    `;



    db.query(

        sql,

        [req.params.id],

        (err,resultado)=>{


            if(err){

                return res.status(500).json({
                    erro:err
                });

            }



            res.json({

                mensagem:"Ocorrência removida!"

            });


        }


    );


});





module.exports = router;