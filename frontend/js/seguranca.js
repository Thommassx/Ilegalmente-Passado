let ocorrencias = JSON.parse(localStorage.getItem("ocorrencias")) || [
    {
        id: 1,
        funcionario: "Carlos Silva",
        local: "Setor A",
        descricao: "Uso incorreto de EPI",
        nivel: "Médio",
        data: "2026-07-16"
    },
    {
        id: 2,
        funcionario: "Mariana Souza",
        local: "Almoxarifado",
        descricao: "Pequeno vazamento",
        nivel: "Baixo",
        data: "2026-07-17"
    },
    {
        id: 3,
        funcionario: "Pedro Oliveira",
        local: "Linha 2",
        descricao: "Princípio de incêndio",
        nivel: "Alto",
        data: "2026-07-18"
    }
];

let editando = null;

const tbody = document.getElementById("listaOcorrencias");
const modal = document.getElementById("modal");
const form = document.getElementById("formOcorrencia");
const pesquisa = document.getElementById("pesquisa");
const filtro = document.getElementById("filtroNivel");

document.getElementById("novaOcorrencia").onclick = abrirModal;
document.getElementById("cancelar").onclick = fecharModal;

window.onclick = (e) => {

    if (e.target === modal) {

        fecharModal();

    }

};

function salvar() {

    localStorage.setItem(
        "ocorrencias",
        JSON.stringify(ocorrencias)
    );

}

function abrirModal() {

    modal.style.display = "flex";

}

function fecharModal() {

    modal.style.display = "none";

    form.reset();

    editando = null;

    document.getElementById("tituloModal").textContent = "Nova Ocorrência";

}

function atualizarCards() {

    document.getElementById("totalOcorrencias").textContent =
        ocorrencias.length;

    document.getElementById("baixoRisco").textContent =
        ocorrencias.filter(o => o.nivel === "Baixo").length;

    document.getElementById("medioRisco").textContent =
        ocorrencias.filter(o => o.nivel === "Médio").length;

    document.getElementById("altoRisco").textContent =
        ocorrencias.filter(o => o.nivel === "Alto").length;

}

function renderizar(lista = ocorrencias) {

    tbody.innerHTML = "";

    lista.forEach(item => {

        const tr = document.createElement("tr");

        tr.innerHTML = `

        <td>${item.funcionario}</td>

        <td>${item.local}</td>

        <td>${item.descricao}</td>

        <td>
            <span class="status ${item.nivel.toLowerCase()}">
                ${item.nivel}
            </span>
        </td>

        <td>${item.data}</td>

        <td>

            <button class="btn btn-warning editar" data-id="${item.id}">
                <i class="fa-solid fa-pen"></i>
            </button>

            <button class="btn btn-danger excluir" data-id="${item.id}">
                <i class="fa-solid fa-trash"></i>
            </button>

        </td>

        `;

        tbody.appendChild(tr);

    });

    adicionarEventos();

    atualizarCards();

}

function adicionarEventos() {

    document.querySelectorAll(".editar").forEach(btn => {

        btn.onclick = () => editar(btn.dataset.id);

    });

    document.querySelectorAll(".excluir").forEach(btn => {

        btn.onclick = () => excluir(btn.dataset.id);

    });

}

function editar(id) {

    const item = ocorrencias.find(o => o.id == id);

    editando = id;

    document.getElementById("tituloModal").textContent =
        "Editar Ocorrência";

    funcionario.value = item.funcionario;
    local.value = item.local;
    descricao.value = item.descricao;
    nivel.value = item.nivel;
    data.value = item.data;

    abrirModal();

}

function excluir(id) {

    if (!confirm("Deseja excluir esta ocorrência?")) return;

    ocorrencias = ocorrencias.filter(o => o.id != id);

    salvar();

    renderizar();

}

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const item = {

        id: editando ? Number(editando) : Date.now(),

        funcionario: funcionario.value,

        local: local.value,

        descricao: descricao.value,

        nivel: nivel.value,

        data: data.value

    };

    if (editando) {

        const indice = ocorrencias.findIndex(o => o.id == editando);

        ocorrencias[indice] = item;

    } else {

        ocorrencias.push(item);

    }

    salvar();

    renderizar();

    fecharModal();

});

pesquisa.addEventListener("keyup", filtrar);

filtro.addEventListener("change", filtrar);

function filtrar() {

    const texto = pesquisa.value.toLowerCase();

    const nivelFiltro = filtro.value;

    const lista = ocorrencias.filter(item => {

        const busca =

            item.funcionario.toLowerCase().includes(texto) ||

            item.local.toLowerCase().includes(texto);

        const nivelOk =

            nivelFiltro === "" ||

            item.nivel === nivelFiltro;

        return busca && nivelOk;

    });

    renderizar(lista);

}

renderizar();