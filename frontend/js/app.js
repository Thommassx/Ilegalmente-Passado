// ======================================================
// ECOFACTORY - DASHBOARD
// ======================================================

const API = "http://localhost:3000/api/maquinas";

let graficoProducao;

const dashboard = {

    maquinasAtivas: 0,

    producaoHoje: 0,

    energia: 0,

    ocorrencias: 0

};


// ======================================================
// GRÁFICO DE PRODUÇÃO
// ======================================================

function criarGraficoProducao(valores = []) {

    const ctx = document.getElementById("graficoProducao");

    if (!ctx) return;

    if (graficoProducao) {

        graficoProducao.destroy();

    }

    graficoProducao = new Chart(ctx, {

        type: "line",

        data: {

            labels: [
                "Seg",
                "Ter",
                "Qua",
                "Qui",
                "Sex",
                "Sáb",
                "Dom"
            ],

            datasets: [{

                label: "Produção",

                data: valores.length ? valores : [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],

                borderColor: "#2563eb",

                backgroundColor: "rgba(37,99,235,.15)",

                borderWidth: 3,

                fill: true,

                tension: .35,

                pointRadius: 5,

                pointHoverRadius: 7

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    grid: {

                        color: "#ececec"

                    }

                },

                x: {

                    grid: {

                        display: false

                    }

                }

            }

        }

    });

}


// ======================================================
// ATUALIZA OS CARDS
// ======================================================

function atualizarDashboard() {

    const maquinasAtivas =
        document.getElementById("maquinasAtivas");

    const producaoHoje =
        document.getElementById("producaoHoje");

    const energia =
        document.getElementById("energia");

    const ocorrencias =
        document.getElementById("ocorrencias");


    if (maquinasAtivas) {

        maquinasAtivas.textContent =
            dashboard.maquinasAtivas;

    }


    if (producaoHoje) {

        producaoHoje.textContent =
            dashboard.producaoHoje.toLocaleString("pt-BR");

    }


    if (energia) {

        energia.textContent =
            dashboard.energia + " kWh";

    }


    if (ocorrencias) {

        ocorrencias.textContent =
            dashboard.ocorrencias;

    }

}


// ======================================================
// BUSCA DADOS DA API
// ======================================================

async function carregarDashboard() {

    try {

        const resposta = await fetch(API);


        if (!resposta.ok) {

            throw new Error("Erro ao buscar máquinas.");

        }


        const maquinas = await resposta.json();


        dashboard.maquinasAtivas =
            maquinas.filter(
                maquina => maquina.status === "Em operação"
            ).length;


        dashboard.energia =
            maquinas.reduce(
                (total, maquina) =>
                    total + Number(maquina.energia || 0),
                0
            );


        dashboard.ocorrencias =
            maquinas.filter(
                maquina => maquina.status === "Manutenção"
            ).length;


        dashboard.producaoHoje =
            maquinas.reduce(
                (total, maquina) =>
                    total + Number(maquina.producao || 0),
                0
            );


        atualizarDashboard();


        criarGraficoProducao(
            maquinas.map(maquina =>
                Number(maquina.producao || 0)
            )
        );


    }

    catch (erro) {

        console.error(erro);

    }

}
// ======================================================
// RELÓGIO
// ======================================================

function atualizarHora() {

    const agora = new Date();

    document.title =
        `EcoFactory | ${agora.toLocaleTimeString("pt-BR")}`;

}


setInterval(atualizarHora, 1000);

atualizarHora();


// ======================================================
// NOTIFICAÇÕES
// ======================================================

const notification = document.querySelector(".notification");


if (notification) {

    notification.addEventListener("click", () => {

        alert(`Notificações

• Produção diária concluída

• Nova manutenção registrada

• Relatório disponível

• Meta de produção atingida`);

    });

}


// ======================================================
// PERFIL
// ======================================================

const profile = document.querySelector(".profile");


if (profile) {

    profile.addEventListener("click", () => {

        alert("Administrador\nEcoFactory");

    });

}


// ======================================================
// ANIMAÇÃO DAS BARRAS
// ======================================================

document.querySelectorAll(".progress div").forEach(bar => {

    const largura = bar.style.width;

    bar.style.width = "0";


    setTimeout(() => {

        bar.style.width = largura;

        bar.style.transition = "1.2s";

    }, 300);

});


// ======================================================
// ANIMAÇÃO DOS CARDS
// ======================================================

document.querySelectorAll(".card").forEach((card, index) => {

    card.style.opacity = "0";

    card.style.transform = "translateY(25px)";


    setTimeout(() => {

        card.style.opacity = "1";

        card.style.transform = "translateY(0)";

        card.style.transition = ".5s";

    }, index * 150);

});


// ======================================================
// DARK MODE
// ======================================================

document.addEventListener("keydown", (e) => {

    if (e.key.toLowerCase() === "d") {

        document.body.classList.toggle("dark");

    }

});


// ======================================================
// INICIALIZAÇÃO
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("EcoFactory iniciado.");

    carregarDashboard();

});