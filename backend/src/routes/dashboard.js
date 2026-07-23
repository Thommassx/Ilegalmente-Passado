const express = require("express");
const router = express.Router();

const db = require("../database");


// DASHBOARD

router.get("/", (req,res)=>{


    const dados = {};


    // buscar máquinas

    db.query(
        "SELECT * FROM maquina",
        (erro, maquinas)=>{


            if(erro){

                console.error(erro);

                return res.status(500).json({
                    erro:"Erro ao buscar máquinas"
                });

            }


            dados.maquinas = maquinas;



            // produção

            db.query(
                "SELECT * FROM producao",
                (erro, producao)=>{


                    if(erro){

                        console.error(erro);

                        return res.status(500).json({
                            erro:"Erro ao buscar produção"
                        });

                    }


                    dados.producao = producao;



                    // sustentabilidade

                    db.query(
                        "SELECT * FROM sustentabilidade",
                        (erro, sustentabilidade)=>{


                            if(erro){

                                console.error(erro);

                                return res.status(500).json({
                                    erro:"Erro ao buscar sustentabilidade"
                                });

                            }


                            dados.sustentabilidade = sustentabilidade;



                            // segurança

                            db.query(
                                "SELECT * FROM seguranca",
                                (erro, seguranca)=>{


                                    if(erro){

                                        console.error(erro);

                                        return res.status(500).json({
                                            erro:"Erro ao buscar segurança"
                                        });

                                    }


                                    dados.seguranca = seguranca;



                                    const maquinasAtivas =
                                    maquinas.filter(
                                        m=>m.status==="Em operação"
                                    ).length;



                                    const energia =
                                    maquinas.reduce(
                                        (total,m)=>
                                        total + Number(m.energia || 0),
                                        0
                                    );



                                    const producaoHoje =
                                    producao.reduce(
                                        (total,p)=>
                                        total + Number(p.quantidade_produzida || 0),
                                        0
                                    );



                                    const produtividade =
                                    producao.length ?

                                    (
                                        producao.reduce(
                                            (total,p)=>
                                            total +
                                            (
                                            Number(p.quantidade_produzida) /
                                            Number(p.quantidade_esperada)
                                            *100
                                            ),
                                            0
                                        )
                                        /
                                        producao.length
                                    ).toFixed(0)

                                    :

                                    0;



                                    const agua =
                                    sustentabilidade
                                    .filter(
                                        s=>s.tipo==="Água"
                                    )
                                    .reduce(
                                        (total,s)=>
                                        total + Number(s.quantidade || 0),
                                        0
                                    );



                                    const reciclagem =
                                    sustentabilidade
                                    .filter(
                                        s=>s.tipo==="Resíduo"
                                    )
                                    .length;



                                    res.json({

                                        maquinasAtivas,

                                        producaoHoje,

                                        energia,

                                        ocorrencias: seguranca.length,

                                        produtividade,

                                        agua,

                                        reciclagem,

                                        maquinas,

                                        producao,

                                        sustentabilidade,

                                        seguranca

                                    });



                                }
                            );

                        }
                    );

                }
            );

        }
    );



});


module.exports = router;