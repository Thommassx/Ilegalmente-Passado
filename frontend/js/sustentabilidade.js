let registros = JSON.parse(localStorage.getItem("sustentabilidade")) || [
    {
        id: 1,
        setor: "Usinagem",
        tipo: "Energia",
        quantidade: 520,
        data: "2026-07-16"
    },
    {
        id: 2,
        setor: "Montagem",
        tipo: "Água",
        quantidade: 1800,
        data: "2026-07-16"
    },
    {
        id: 3,
        setor: "Reciclagem",
        tipo: "Resíduo",
        quantidade: 120,
        data: "2026-07-17"
    }
];

let editando = null;

const tbody = document.getElementById("listaSustentabilidade");
const modal = document.getElementById("modal");
const form = document.getElementById("formRegistro");
const pesquisa = document.getElementById("pesquisa");
const filtro = document.getElementById("filtroTipo");

document.getElementById("novoRegistro").onclick = abrirModal;
document.getElementById("cancelar").onclick = fecharModal;

window.onclick = (e) => {

    if (e.target === modal) {

        fecharModal();

    }

};

function salvar() {

    localStorage.setItem(
        "sustentabilidade",
        JSON.stringify(registros)
    );

}

function abrirModal() {

    modal.style.display = "flex";

}

function fecharModal() {

    modal.style.display = "none";

    form.reset();

    editando = null;

    document.getElementById("tituloModal").textContent =
        "Novo Registro";

}

function atualizarCards() {

    const energia = registros
        .filter(r => r.tipo === "Energia")
        .reduce((s, r) => s + r.quantidade, 0);

    const agua = registros
        .filter(r => r.tipo === "Água")
        .reduce((s, r) => s + r.quantidade, 0);

    const residuos = registros
        .filter(r => r.tipo === "Resíduo")
        .reduce((s, r) => s + r.quantidade, 0);

    document.getElementById("energiaTotal").textContent =
        energia.toLocaleString("pt-BR") + " kWh";

    document.getElementById("aguaTotal").textContent =
        agua.toLocaleString("pt-BR") + " L";

    document.getElementById("residuosTotal").textContent =
        residuos.toLocaleString("pt-BR") + " kg";

    const taxa = energia === 0
        ? 0
        : Math.min(100, Math.round((residuos / energia) * 100));

    document.getElementById("reciclagem").textContent =
        taxa + "%";

}

function renderizar(lista = registros) {

    tbody.innerHTML = "";

    lista.forEach(registro => {

        const tr = document.createElement("tr");

        tr.innerHTML = `

        <td>${registro.setor}</td>

        <td>${registro.tipo}</td>

        <td>${registro.quantidade}</td>

        <td>${registro.data}</td>

        <td>

            <button
                class="btn btn-warning editar"
                data-id="${registro.id}">

                <i class="fa-solid fa-pen"></i>

            </button>

            <button
                class="btn btn-danger excluir"
                data-id="${registro.id}">

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

    const registro = registros.find(r => r.id == id);

    editando = id;

    document.getElementById("tituloModal").textContent =
        "Editar Registro";

    setor.value = registro.setor;
    tipo.value = registro.tipo;
    quantidade.value = registro.quantidade;
    data.value = registro.data;

    abrirModal();

}

function excluir(id) {

    if (!confirm("Deseja excluir este registro?")) return;

    registros = registros.filter(r => r.id != id);

    salvar();

    renderizar();

}

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const registro = {

        id: editando ? Number(editando) : Date.now(),

        setor: setor.value,

        tipo: tipo.value,

        quantidade: Number(quantidade.value),

        data: data.value

    };

    if (editando) {

        const indice = registros.findIndex(r => r.id == editando);

        registros[indice] = registro;

    } else {

        registros.push(registro);

    }

    salvar();

    renderizar();

    fecharModal();

});

pesquisa.addEventListener("keyup", filtrar);

filtro.addEventListener("change", filtrar);

function filtrar() {

    const texto = pesquisa.value.toLowerCase();

    const tipoFiltro = filtro.value;

    const lista = registros.filter(registro => {

        const busca = registro.setor
            .toLowerCase()
            .includes(texto);

        const tipoOk =
            tipoFiltro === "" ||
            registro.tipo === tipoFiltro;

        return busca && tipoOk;

    });

    renderizar(lista);

}

renderizar();