let producoes = [];

const API = "http://localhost:3000/api/producao";

let editando = null;

const tbody = document.getElementById("listaProducoes");
const modal = document.getElementById("modal");
const form = document.getElementById("formProducao");
const pesquisa = document.getElementById("pesquisa");
const filtro = document.getElementById("filtroStatus");

const produto = document.getElementById("produto");
const maquina = document.getElementById("maquina");
const quantidadeProduzida = document.getElementById("quantidadeProduzida");
const quantidadeEsperada = document.getElementById("quantidadeEsperada");
const data = document.getElementById("data");
const status = document.getElementById("status");


document.getElementById("novaProducao").onclick = abrirModal;

document.getElementById("cancelar").onclick = fecharModal;


window.onclick = (e)=>{

    if(e.target === modal){

        fecharModal();

    }

};


// ======================================================
// BUSCAR PRODUÇÕES
// ======================================================

async function carregarProducoes(){

    try{

        const resposta = await fetch(API);


        if(!resposta.ok){

            throw new Error("Erro ao buscar produções.");

        }


        producoes = await resposta.json();


        renderizar();


    }

    catch(erro){

        console.error(erro);

    }

}


// ======================================================
// MODAL
// ======================================================

function abrirModal(){

    modal.style.display="flex";

}


function fecharModal(){

    modal.style.display="none";

    form.reset();

    editando=null;


    document.getElementById("tituloModal").textContent =
    "Nova Produção";

}


// ======================================================
// PRODUTIVIDADE
// ======================================================

function calcularProdutividade(item){

    if(!item.quantidade_esperada){

        return 0;

    }


    return (

        Number(item.quantidade_produzida) /

        Number(item.quantidade_esperada)

    ) * 100;

}


// ======================================================
// CARDS
// ======================================================

function atualizarCards(){


    const total = producoes.reduce(

        (s,p)=>s + Number(p.quantidade_produzida || 0),

        0

    );


    document.getElementById("producaoHoje").textContent =
    total.toLocaleString("pt-BR");



    document.getElementById("ordensConcluidas").textContent =

    producoes.filter(

        p=>p.status==="Concluída"

    ).length;



    const media = producoes.length ?

    producoes.reduce(

        (s,p)=>s + calcularProdutividade(p),

        0

    ) / producoes.length

    :0;



    document.getElementById("eficiencia").textContent =

    media.toFixed(0)+"%";


}
// ======================================================
// STATUS
// ======================================================

function classe(status){

    if(status==="Concluída") return "ativo";

    if(status==="Em andamento") return "manutencao";

    return "parado";

}


// ======================================================
// RENDERIZAR TABELA
// ======================================================

function renderizar(lista = producoes){

    tbody.innerHTML = "";


    lista.forEach(item=>{


        const tr = document.createElement("tr");


        tr.innerHTML = `

        <td>OP-${item.id}</td>

        <td>${item.produto}</td>

        <td>${item.maquina_nome || item.maquina_id}</td>

        <td>

        ${item.quantidade_produzida}

        </td>


        <td>

        ${calcularProdutividade(item).toFixed(0)}%

        </td>


        <td>

        ${item.data_producao}

        </td>


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


// ======================================================
// EVENTOS
// ======================================================

function eventos(){


    document.querySelectorAll(".editar")

    .forEach(btn=>{


        btn.onclick = ()=>editar(btn.dataset.id);


    });



    document.querySelectorAll(".excluir")

    .forEach(btn=>{


        btn.onclick = ()=>excluir(btn.dataset.id);


    });


}


// ======================================================
// EDITAR
// ======================================================

function editar(id){


    const p = producoes.find(

        x=>x.id == id

    );


    editando = id;


    document.getElementById("tituloModal").textContent =

    "Editar Produção";



    produto.value = p.produto;


    maquina.value = p.maquina_id;


    quantidadeProduzida.value =

    p.quantidade_produzida;



    quantidadeEsperada.value =

    p.quantidade_esperada;



    data.value = p.data_producao;


    status.value = p.status;



    abrirModal();


}


// ======================================================
// EXCLUIR
// ======================================================

async function excluir(id){


    if(!confirm("Excluir esta produção?"))

    return;



    await fetch(`${API}/${id}`,{

        method:"DELETE"

    });



    carregarProducoes();


}


// ======================================================
// SALVAR
// ======================================================

form.addEventListener("submit", async(e)=>{


    e.preventDefault();



    const obj = {


        produto: produto.value,


        maquina_id: Number(maquina.value),



        quantidade_produzida:

        Number(quantidadeProduzida.value),



        quantidade_esperada:

        Number(quantidadeEsperada.value),



        data_producao:

        data.value,



        status:

        status.value


    };



    let url = API;

    let metodo = "POST";



    if(editando){


        url = `${API}/${editando}`;


        metodo = "PUT";


    }



    await fetch(url,{


        method:metodo,


        headers:{


            "Content-Type":"application/json"


        },


        body:JSON.stringify(obj)


    });



    await carregarProducoes();


    fecharModal();


});


// ======================================================
// FILTROS
// ======================================================

pesquisa.addEventListener("keyup",filtrar);


filtro.addEventListener("change",filtrar);



function filtrar(){


    const texto = pesquisa.value.toLowerCase();


    const statusFiltro = filtro.value;



    const lista = producoes.filter(p=>{


        const busca =


        p.produto.toLowerCase()

        .includes(texto)

        ||

        String(p.maquina_nome || p.maquina_id)

        .toLowerCase()

        .includes(texto);



        const statusOk =


        statusFiltro === ""

        ||

        p.status === statusFiltro;



        return busca && statusOk;


    });



    renderizar(lista);


}


// ======================================================
// INICIALIZAÇÃO
// ======================================================

carregarProducoes();