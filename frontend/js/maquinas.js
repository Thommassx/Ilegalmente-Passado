let maquinas = JSON.parse(localStorage.getItem("maquinas")) || [
    {
        id: 1,
        nome: "CNC-01",
        setor: "Usinagem",
        tipo: "CNC",
        status: "Em operação",
        temperatura: 42,
        energia: 180
    },
    {
        id: 2,
        nome: "Prensa-02",
        setor: "Montagem",
        tipo: "Prensa",
        status: "Manutenção",
        temperatura: 0,
        energia: 0
    },
    {
        id: 3,
        nome: "Laser-05",
        setor: "Corte",
        tipo: "Laser",
        status: "Em operação",
        temperatura: 36,
        energia: 140
    }
];

let editando = null;

const tbody = document.getElementById("listaMaquinas");

const modal = document.getElementById("modal");

const form = document.getElementById("formMaquina");

const pesquisa = document.getElementById("pesquisa");

const filtro = document.getElementById("filtroStatus");

const btnNova = document.getElementById("novaMaquina");

const cancelar = document.getElementById("cancelar");

function salvarLocalStorage() {

    localStorage.setItem("maquinas", JSON.stringify(maquinas));

}

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

function atualizarCards() {

    document.getElementById("totalMaquinas").textContent = maquinas.length;

    document.getElementById("ativas").textContent =
        maquinas.filter(m => m.status === "Em operação").length;

    document.getElementById("manutencao").textContent =
        maquinas.filter(m => m.status === "Manutenção").length;

    document.getElementById("paradas").textContent =
        maquinas.filter(m => m.status === "Parada").length;

}

function classeStatus(status){

    if(status==="Em operação") return "ativo";

    if(status==="Manutenção") return "manutencao";

    return "parado";

}

function renderizarTabela(lista = maquinas){

    tbody.innerHTML="";

    lista.forEach(maquina=>{

        const tr=document.createElement("tr");

        tr.innerHTML=`

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
                data-id="${maquina.id}">

                <i class="fa-solid fa-pen"></i>

            </button>

            <button
                class="btn btn-danger excluir"
                data-id="${maquina.id}">

                <i class="fa-solid fa-trash"></i>

            </button>

        </td>

        `;

        tbody.appendChild(tr);

    });

    adicionarEventos();

    atualizarCards();

}

function adicionarEventos(){

    document.querySelectorAll(".editar").forEach(botao=>{

        botao.onclick=()=>{

            editarMaquina(botao.dataset.id);

        };

    });

    document.querySelectorAll(".excluir").forEach(botao=>{

        botao.onclick=()=>{

            excluirMaquina(botao.dataset.id);

        };

    });

}

function editarMaquina(id){

    const maquina=maquinas.find(m=>m.id==id);

    editando=id;

    document.getElementById("tituloModal").textContent="Editar Máquina";

    document.getElementById("nome").value=maquina.nome;

    document.getElementById("setor").value=maquina.setor;

    document.getElementById("tipo").value=maquina.tipo;

    document.getElementById("status").value=maquina.status;

    document.getElementById("temperatura").value=maquina.temperatura;

    document.getElementById("energia").value=maquina.energia;

    abrirModal();

}

function excluirMaquina(id){

    const confirmar=confirm("Deseja realmente excluir esta máquina?");

    if(!confirmar) return;

    maquinas=maquinas.filter(m=>m.id!=id);

    salvarLocalStorage();

    renderizarTabela();

}

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    const maquina={

        id:editando ? Number(editando) : Date.now(),

        nome:document.getElementById("nome").value,

        setor:document.getElementById("setor").value,

        tipo:document.getElementById("tipo").value,

        status:document.getElementById("status").value,

        temperatura:Number(document.getElementById("temperatura").value),

        energia:Number(document.getElementById("energia").value)

    };

    if(editando){

        const indice=maquinas.findIndex(m=>m.id==editando);

        maquinas[indice]=maquina;

    }else{

        maquinas.push(maquina);

    }

    salvarLocalStorage();

    renderizarTabela();

    fecharModal();

});

pesquisa.addEventListener("keyup",filtrar);

filtro.addEventListener("change",filtrar);

function filtrar(){

    const texto=pesquisa.value.toLowerCase();

    const status=filtro.value;

    const lista=maquinas.filter(maquina=>{

        const nome=maquina.nome.toLowerCase().includes(texto);

        const filtroStatus=status==="" || maquina.status===status;

        return nome && filtroStatus;

    });

    renderizarTabela(lista);

}

renderizarTabela();