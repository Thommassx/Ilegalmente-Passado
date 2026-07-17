// ======================================================
// ECOFACTORY - DASHBOARD
// ======================================================

// ======================================================
// GRÁFICO DE PRODUÇÃO
// ======================================================

const ctx = document.getElementById("graficoProducao");

if (ctx) {

    new Chart(ctx, {

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

                data: [
                    6200,
                    7100,
                    6950,
                    8100,
                    8540,
                    7900,
                    8300
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
// DADOS DO DASHBOARD
// ======================================================

const dashboard = {

    total: 0,

    maquinasAtivas: 0,

    manutencao: 0,

    paradas: 0,

    producaoHoje: 8540,

    energia: 620,

    ocorrencias: 2

};

const API = "http://localhost:3000/api/maquinas";

// ======================================================
// ATUALIZA CARDS
// ======================================================

function carregarDashboard() {

    const total = document.getElementById("totalMaquinas");

    if (total) {

        total.textContent = dashboard.total;

    }

    const ativas = document.getElementById("maquinasAtivas");

    if (ativas) {

        ativas.textContent = dashboard.maquinasAtivas;

    }

    const manutencao = document.getElementById("manutencao");

    if (manutencao) {

        manutencao.textContent = dashboard.manutencao;

    }

    const paradas = document.getElementById("paradas");

    if (paradas) {

        paradas.textContent = dashboard.paradas;

    }

    const producao = document.getElementById("producaoHoje");

    if (producao) {

        producao.textContent =
            dashboard.producaoHoje.toLocaleString("pt-BR");

    }

    const energia = document.getElementById("energia");

    if (energia) {

        energia.textContent =
            `${dashboard.energia} kWh`;

    }

    const ocorrencias = document.getElementById("ocorrencias");

    if (ocorrencias) {

        ocorrencias.textContent =
            dashboard.ocorrencias;

    }

}
async function carregarDashboard() {

    try {

        const resposta = await fetch(API);

        const maquinas = await resposta.json();

        dashboard.total = maquinas.length;

        dashboard.maquinasAtivas =
            maquinas.filter(m => m.status === "Em operação").length;

        dashboard.manutencao =
            maquinas.filter(m => m.status === "Manutenção").length;

        dashboard.paradas =
            maquinas.filter(m => m.status === "Parada").length;

        atualizarDashboard();

    } catch (erro) {

        console.error("Erro ao carregar dashboard:", erro);

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
// SIMULAÇÃO DOS INDICADORES
// ======================================================

function simularProducao() {

    dashboard.producaoHoje += Math.floor(Math.random() * 25);

    dashboard.energia += Math.floor(Math.random() * 3);

    atualizarDashboard();

}

setInterval(simularProducao, 7000);

atualizarDashboard();

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

});