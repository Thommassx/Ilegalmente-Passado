const express = require("express");

const router = express.Router();

const db = require("../database");


// LISTAR REGISTROS
router.get("/", (req,res)=>{

    const sql = `
        SELECT * FROM sustentabilidade
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



// CADASTRAR REGISTRO
router.post("/",(req,res)=>{


    const {

        consumo_energia,

        consumo_agua,

        quantidade_residuos,

        quantidade_reciclada,

        data_registro


    } = req.body;



    const sql = `

        INSERT INTO sustentabilidade

        (

            consumo_energia,

            consumo_agua,

            quantidade_residuos,

            quantidade_reciclada,

            data_registro

        )

        VALUES (?,?,?,?,?)

    `;



    db.query(

        sql,

        [

            consumo_energia,

            consumo_agua,

            quantidade_residuos,

            quantidade_reciclada,

            data_registro

        ],


        (err,resultado)=>{


            if(err){

                return res.status(500).json({
                    erro:err
                });

            }



            res.status(201).json({

                mensagem:"Registro ambiental cadastrado!",

                id:resultado.insertId

            });


        }


    );


});




// EXCLUIR REGISTRO
router.delete("/:id",(req,res)=>{


    const sql = `

        DELETE FROM sustentabilidade

        WHERE id_sustentabilidade = ?

    `;



    db.query(

        sql,

        [req.params.id],


        (err)=>{


            if(err){

                return res.status(500).json({
                    erro:err
                });

            }


            res.json({

                mensagem:"Registro removido!"

            });


        }


    );


});



module.exports = router;