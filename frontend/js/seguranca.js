let ocorrencias = [];

const API = "http://localhost:3000/api/seguranca";

let editando = null;


const tbody = document.getElementById("listaOcorrencias");

const modal = document.getElementById("modal");

const form = document.getElementById("formOcorrencia");

const pesquisa = document.getElementById("pesquisa");

const filtro = document.getElementById("filtroNivel");



const tipoOcorrencia = document.getElementById("tipo_ocorrencia");

const local = document.getElementById("local");

const dataOcorrencia = document.getElementById("data_ocorrencia");

const nivelRisco = document.getElementById("nivel_risco");

const descricao = document.getElementById("descricao");

const medidaPreventiva = document.getElementById("medida_preventiva");





document.getElementById("novaOcorrencia").onclick = abrirModal;

document.getElementById("cancelar").onclick = fecharModal;




window.onclick = (e)=>{

    if(e.target === modal){

        fecharModal();

    }

};






// BUSCAR OCORRÊNCIAS

async function carregarOcorrencias(){


    try{


        const resposta = await fetch(API);



        if(!resposta.ok){

            throw new Error("Erro ao buscar ocorrências");

        }



        ocorrencias = await resposta.json();



        renderizar();



    }catch(erro){

        console.error(erro);

    }


}






// MODAL

function abrirModal(){

    modal.style.display="flex";

}





function fecharModal(){


    modal.style.display="none";


    form.reset();


    editando=null;


    document.getElementById("tituloModal").textContent =

    "Nova Ocorrência";


}







// CARDS

function atualizarCards(){



    document.getElementById("totalOcorrencias").textContent =

    ocorrencias.length;




    document.getElementById("baixoRisco").textContent =

    ocorrencias.filter(

        o=>o.nivel_risco==="Baixo"

    ).length;





    document.getElementById("medioRisco").textContent =

    ocorrencias.filter(

        o=>o.nivel_risco==="Médio"

    ).length;





    document.getElementById("altoRisco").textContent =

    ocorrencias.filter(

        o=>o.nivel_risco==="Alto"

    ).length;



}
// RENDERIZAR TABELA

function renderizar(lista = ocorrencias){


    tbody.innerHTML = "";



    lista.forEach(item=>{


        const tr = document.createElement("tr");



        tr.innerHTML = `



        <td>${item.tipo_ocorrencia}</td>



        <td>${item.local}</td>



        <td>


            <span class="status">

                ${item.nivel_risco}

            </span>


        </td>



        <td>${item.data_ocorrencia}</td>



        <td>${item.descricao}</td>



        <td>



            <button

            class="btn btn-danger excluir"

            data-id="${item.id_seguranca}">


            <i class="fa-solid fa-trash"></i>


            </button>



        </td>



        `;



        tbody.appendChild(tr);



    });



    eventos();


    atualizarCards();


}







// EVENTOS

function eventos(){


    document.querySelectorAll(".excluir")

    .forEach(btn=>{


        btn.onclick = ()=>{

            excluir(btn.dataset.id);

        };


    });


}







// EXCLUIR

async function excluir(id){


    if(!confirm("Deseja excluir esta ocorrência?"))

    return;




    await fetch(`${API}/${id}`,{


        method:"DELETE"


    });



    carregarOcorrencias();


}








// SALVAR

form.addEventListener("submit", async(e)=>{


    e.preventDefault();



    const ocorrencia = {



        tipo_ocorrencia:

        tipoOcorrencia.value,



        local:

        local.value,



        data_ocorrencia:

        dataOcorrencia.value,



        nivel_risco:

        nivelRisco.value,



        descricao:

        descricao.value,



        medida_preventiva:

        medidaPreventiva.value



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



        body:JSON.stringify(ocorrencia)



    });





    await carregarOcorrencias();



    fecharModal();



});









// PESQUISA/FILTRO

pesquisa.addEventListener("keyup",filtrar);


filtro.addEventListener("change",filtrar);





function filtrar(){



    const texto = pesquisa.value.toLowerCase();



    const nivelFiltro = filtro.value;




    const lista = ocorrencias.filter(item=>{



        const busca =


        item.tipo_ocorrencia

        .toLowerCase()

        .includes(texto)



        ||



        item.local

        .toLowerCase()

        .includes(texto);





        const nivelOk =



        nivelFiltro === ""

        ||

        item.nivel_risco === nivelFiltro;





        return busca && nivelOk;



    });





    renderizar(lista);



}








// INICIALIZAÇÃO

carregarOcorrencias();