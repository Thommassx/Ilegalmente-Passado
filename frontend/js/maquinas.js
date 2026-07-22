// =========================
// CONFIGURAÇÕES
// =========================

const API = "http://localhost:3000/api/maquinas";

let maquinas = [];
let editando = null;

// =========================
// ELEMENTOS DA PÁGINA
// =========================

const tbody = document.getElementById("listaMaquinas");
const modal = document.getElementById("modal");
const form = document.getElementById("formMaquina");

const pesquisa = document.getElementById("pesquisa");
const filtro = document.getElementById("filtroStatus");

const btnNova = document.getElementById("novaMaquina");
const cancelar = document.getElementById("cancelar");

const campos = {
    nome: document.getElementById("nome"),
    setor: document.getElementById("setor"),
    tipo: document.getElementById("tipo"),
    status: document.getElementById("status"),
    temperatura: document.getElementById("temperatura"),
    energia: document.getElementById("energia")
};

// =========================
// API
// =========================

async function carregarMaquinas() {

    try {

        const resposta = await fetch(API);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar máquinas.");
        }

        maquinas = await resposta.json();

        renderizarTabela();

    } catch (erro) {

        console.error(erro);

        alert("Não foi possível carregar as máquinas.");

    }

}

// =========================
// MODAL
// =========================

function abrirModal() {

    modal.style.display = "flex";

}

function fecharModal() {

    modal.style.display = "none";

    form.reset();

    editando = null;

    document.getElementById("tituloModal").textContent = "Nova Máquina";

}

btnNova.addEventListener("click", abrirModal);

cancelar.addEventListener("click", fecharModal);

window.addEventListener("click", (e) => {

    if (e.target === modal) {

        fecharModal();

    }

});

// =========================
// DASHBOARD
// =========================

function atualizarCards() {

    document.getElementById("totalMaquinas").textContent =
        maquinas.length;

    document.getElementById("ativas").textContent =
        maquinas.filter(m => m.status === "Em operação").length;

    document.getElementById("manutencao").textContent =
        maquinas.filter(m => m.status === "Manutenção").length;

    document.getElementById("paradas").textContent =
        maquinas.filter(m => m.status === "Parada").length;

}

// =========================
// STATUS
// =========================

function classeStatus(status) {

    switch (status) {

        case "Em operação":
            return "ativo";

        case "Manutenção":
            return "manutencao";

        default:
            return "parado";

    }

}

// =========================
// TABELA
// =========================

function renderizarTabela(lista = maquinas) {

    tbody.innerHTML = "";

    lista.forEach(maquina => {

        const tr = document.createElement("tr");

        tr.innerHTML = `

        <td>${maquina.nome}</td>

        <td>${maquina.setor}</td>

        <td>${maquina.tipo}</td>

        <td>

            <span class="status ${classeStatus(maquina.status)}">

                ${maquina.status}

            </span>

        </td>

        <td>${maquina.temperatura}°C</td>

        <td>${maquina.energia} kWh</td>

        <td>

            <button
                class="btn btn-warning editar"
                data-id="${maquina.id_maquina}">

                <i class="fa-solid fa-pen"></i>

            </button>

            <button
                class="btn btn-danger excluir"
                data-id="${maquina.id_maquina}">

                <i class="fa-solid fa-trash"></i>

            </button>

        </td>

        `;

        tbody.appendChild(tr);

    });

    adicionarEventos();

    atualizarCards();

}
// =========================
// EVENTOS DOS BOTÕES
// =========================

function adicionarEventos() {

    document.querySelectorAll(".editar").forEach(botao => {

        botao.onclick = () => editarMaquina(botao.dataset.id);

    });

    document.querySelectorAll(".excluir").forEach(botao => {

        botao.onclick = () => excluirMaquina(botao.dataset.id);

    });

}

// =========================
// EDITAR
// =========================

function editarMaquina(id) {

    const maquina = maquinas.find(m => m.id_maquina == id);

    if (!maquina) return;

    editando = id;

    document.getElementById("tituloModal").textContent = "Editar Máquina";

    campos.nome.value = maquina.nome;
    campos.setor.value = maquina.setor;
    campos.tipo.value = maquina.tipo;
    campos.status.value = maquina.status;
    campos.temperatura.value = maquina.temperatura;
    campos.energia.value = maquina.energia;

    abrirModal();

}

// =========================
// EXCLUIR
// =========================

async function excluirMaquina(id) {

    if (!confirm("Deseja realmente excluir esta máquina?")) return;

    try {

        const resposta = await fetch(`${API}/${id}`, {

            method: "DELETE"

        });

        if (!resposta.ok) {

            throw new Error("Erro ao excluir.");

        }

        await carregarMaquinas();

    } catch (erro) {

        console.error(erro);

        alert("Erro ao excluir a máquina.");

    }

}

// =========================
// FORMULÁRIO
// =========================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const maquina = {

        nome: campos.nome.value.trim(),

        setor: campos.setor.value.trim(),

        tipo: campos.tipo.value.trim(),

        status: campos.status.value,

        temperatura: Number(campos.temperatura.value),

        energia: Number(campos.energia.value)

    };

    try {

        let resposta;

        if (editando) {

            resposta = await fetch(`${API}/${editando}`, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(maquina)

            });

        } else {

            resposta = await fetch(API, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(maquina)

            });

        }

        if (!resposta.ok) {

    const erro = await resposta.text();

    console.error("Resposta do servidor:", erro);

    throw new Error(erro);

}

        await carregarMaquinas();

        fecharModal();

    } catch (erro) {

        console.error(erro);

        alert("Erro ao salvar a máquina.");

    }

});

// =========================
// FILTROS
// =========================

pesquisa.addEventListener("keyup", filtrar);

filtro.addEventListener("change", filtrar);

function filtrar() {

    const texto = pesquisa.value.toLowerCase();

    const status = filtro.value;

    const lista = maquinas.filter(maquina => {

        const nome = maquina.nome.toLowerCase().includes(texto);

        const statusValido = status === "" || maquina.status === status;

        return nome && statusValido;

    });

    renderizarTabela(lista);

}

// =========================
// INICIALIZAÇÃO
// =========================

carregarMaquinas();