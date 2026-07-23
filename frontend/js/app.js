// ======================================================
// ECOFACTORY - DASHBOARD REAL
// ======================================================

const API = "http://localhost:3000/api/dashboard";

let graficoProducao;


// ======================================================
// GRÁFICO
// ======================================================

function criarGraficoProducao(valores = []){


    const ctx = document.getElementById("graficoProducao");


    if(!ctx) return;



    if(graficoProducao){

        graficoProducao.destroy();

    }




    graficoProducao = new Chart(ctx,{


        type:"line",


        data:{


            labels:[

                "Seg",
                "Ter",
                "Qua",
                "Qui",
                "Sex",
                "Sáb",
                "Dom"

            ],



            datasets:[{


                label:"Produção",


                data: valores.length ? valores : [

                    0,0,0,0,0,0,0

                ],



                borderWidth:3,


                fill:true,


                tension:.35



            }]



        },



        options:{


            responsive:true,


            maintainAspectRatio:false,



            plugins:{


                legend:{


                    display:false


                }


            }


        }


    });


}







// ======================================================
// CARDS
// ======================================================


function atualizarCards(dados){



    document.getElementById("maquinasAtivas").textContent =

    dados.maquinasAtivas;



    document.getElementById("producaoHoje").textContent =

    dados.producaoHoje.toLocaleString("pt-BR");



    document.getElementById("energia").textContent =

    dados.energia + " kWh";



    document.getElementById("ocorrencias").textContent =

    dados.ocorrencias;



}








// ======================================================
// INDICADORES
// ======================================================


function atualizarIndicadores(dados){



    document.getElementById("produtividade").textContent =

    dados.produtividade + "%";



    document.getElementById("barraProdutividade").style.width =

    dados.produtividade + "%";






    document.getElementById("consumoAgua").textContent =

    dados.agua + " L";



    document.getElementById("barraAgua").style.width =

    Math.min(dados.agua / 100,100) + "%";






    document.getElementById("reciclagem").textContent =

    dados.reciclagem + "%";



    document.getElementById("barraReciclagem").style.width =

    dados.reciclagem + "%";



}
// ======================================================
// TABELA DE MÁQUINAS
// ======================================================

function atualizarMaquinas(maquinas){


    const tabela = document.getElementById("tabelaMaquinas");


    if(!tabela) return;



    tabela.innerHTML = "";



    maquinas.forEach(maquina=>{


        const tr = document.createElement("tr");



        let classe = "parado";


        if(maquina.status === "Em operação"){

            classe = "ativo";

        }


        if(maquina.status === "Manutenção"){

            classe = "manutencao";

        }




        tr.innerHTML = `


        <td>${maquina.nome}</td>


        <td>${maquina.setor}</td>


        <td>


        <span class="status ${classe}">

        ${maquina.status}

        </span>


        </td>


        `;



        tabela.appendChild(tr);



    });



}







// ======================================================
// ATIVIDADES RECENTES
// ======================================================


function atualizarAtividades(dados){


    const lista = document.getElementById("atividadesRecentes");


    if(!lista) return;



    lista.innerHTML = "";





    const atividades = [];





    dados.producao.slice(-3).forEach(p=>{


        atividades.push(

        `Produção registrada: ${p.produto}`

        );


    });





    dados.seguranca.slice(-2).forEach(s=>{


        atividades.push(

        `Ocorrência: ${s.tipo_ocorrencia}`

        );


    });






    dados.maquinas.slice(0,2).forEach(m=>{


        atividades.push(

        `Máquina ${m.nome}: ${m.status}`

        );


    });







    atividades.slice(0,5).forEach(texto=>{


        const li = document.createElement("li");


        li.textContent = texto;


        lista.appendChild(li);



    });



}







// ======================================================
// BUSCAR DASHBOARD
// ======================================================


async function carregarDashboard(){


    try{


        const resposta = await fetch(API);



        if(!resposta.ok){


            throw new Error(

            "Erro ao carregar dashboard"

            );


        }





        const dados = await resposta.json();





        atualizarCards(dados);


        atualizarIndicadores(dados);


        atualizarMaquinas(dados.maquinas);


        atualizarAtividades(dados);







        const valoresGrafico = dados.producao.map(p=>{


            return Number(

            p.quantidade_produzida || 0

            );


        });




        criarGraficoProducao(valoresGrafico);



    }catch(erro){


        console.error(erro);


    }


}







// ======================================================
// RELÓGIO
// ======================================================


function atualizarHora(){


    const agora = new Date();


    document.title =

    `EcoFactory | ${agora.toLocaleTimeString("pt-BR")}`;


}



setInterval(atualizarHora,1000);

atualizarHora();







// ======================================================
// INICIALIZAÇÃO
// ======================================================


document.addEventListener("DOMContentLoaded",()=>{


    console.log("EcoFactory iniciado");


    carregarDashboard();



});