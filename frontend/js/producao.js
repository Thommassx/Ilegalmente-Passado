let producoes = JSON.parse(localStorage.getItem("producoes")) || [
    {
        id: 1,
        produto: "Parafuso M12",
        maquina: "CNC-01",
        quantidade: 2500,
        data: "2026-07-16",
        status: "Concluída"
    },
    {
        id: 2,
        produto: "Chapa de Aço",
        maquina: "Laser-05",
        quantidade: 1800,
        data: "2026-07-16",
        status: "Em andamento"
    },
    {
        id: 3,
        produto: "Suporte Metálico",
        maquina: "Prensa-02",
        quantidade: 900,
        data: "2026-07-17",
        status: "Pendente"
    }
];

let editando = null;

const tbody = document.getElementById("listaProducoes");
const modal = document.getElementById("modal");
const form = document.getElementById("formProducao");
const pesquisa = document.getElementById("pesquisa");
const filtro = document.getElementById("filtroStatus");

document.getElementById("novaProducao").onclick = abrirModal;
document.getElementById("cancelar").onclick = fecharModal;

window.onclick = (e)=>{

    if(e.target===modal){

        fecharModal();

    }

};

function salvar(){

    localStorage.setItem("producoes",JSON.stringify(producoes));

}

function abrirModal(){

    modal.style.display="flex";

}

function fecharModal(){

    modal.style.display="none";

    form.reset();

    editando=null;

    document.getElementById("tituloModal").textContent="Nova Produção";

}

function atualizarCards(){

    const concluidas=producoes.filter(p=>p.status==="Concluída");

    const quantidade=concluidas.reduce((s,p)=>s+p.quantidade,0);

    document.getElementById("producaoHoje").textContent=
        quantidade.toLocaleString("pt-BR");

    document.getElementById("ordensConcluidas").textContent=
        concluidas.length;

    const eficiencia=((quantidade/10000)*100);

    document.getElementById("eficiencia").textContent=
        eficiencia.toFixed(0)+"%";

}

function classe(status){

    if(status==="Concluída") return "ativo";

    if(status==="Em andamento") return "manutencao";

    return "parado";

}

function renderizar(lista=producoes){

    tbody.innerHTML="";

    lista.forEach(item=>{

        const tr=document.createElement("tr");

        tr.innerHTML=`

        <td>OP-${item.id}</td>

        <td>${item.produto}</td>

        <td>${item.maquina}</td>

        <td>${item.quantidade}</td>

        <td>${item.data}</td>

        <td>

            <span class="status ${classe(item.status)}">

                ${item.status}

            </span>

        </td>

        <td>

            <button
                class="btn btn-warning editar"
                data-id="${item.id}">

                <i class="fa-solid fa-pen"></i>

            </button>

            <button
                class="btn btn-danger excluir"
                data-id="${item.id}">

                <i class="fa-solid fa-trash"></i>

            </button>

        </td>

        `;

        tbody.appendChild(tr);

    });

    eventos();

    atualizarCards();

}

function eventos(){

    document.querySelectorAll(".editar").forEach(btn=>{

        btn.onclick=()=>editar(btn.dataset.id);

    });

    document.querySelectorAll(".excluir").forEach(btn=>{

        btn.onclick=()=>excluir(btn.dataset.id);

    });

}

function editar(id){

    const p=producoes.find(x=>x.id==id);

    editando=id;

    document.getElementById("tituloModal").textContent="Editar Produção";

    produto.value=p.produto;
    maquina.value=p.maquina;
    quantidade.value=p.quantidade;
    data.value=p.data;
    status.value=p.status;

    abrirModal();

}

function excluir(id){

    if(!confirm("Excluir esta produção?")) return;

    producoes=producoes.filter(p=>p.id!=id);

    salvar();

    renderizar();

}

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    const obj={

        id:editando ? Number(editando) : Date.now(),

        produto:produto.value,

        maquina:maquina.value,

        quantidade:Number(quantidade.value),

        data:data.value,

        status:status.value

    };

    if(editando){

        const indice=producoes.findIndex(p=>p.id==editando);

        producoes[indice]=obj;

    }else{

        producoes.push(obj);

    }

    salvar();

    renderizar();

    fecharModal();

});

pesquisa.addEventListener("keyup",filtrar);

filtro.addEventListener("change",filtrar);

function filtrar(){

    const texto=pesquisa.value.toLowerCase();

    const statusFiltro=filtro.value;

    const lista=producoes.filter(p=>{

        const busca=

            p.produto.toLowerCase().includes(texto) ||

            p.maquina.toLowerCase().includes(texto);

        const statusOk=

            statusFiltro==="" ||

            p.status===statusFiltro;

        return busca && statusOk;

    });

    renderizar(lista);

}

renderizar();