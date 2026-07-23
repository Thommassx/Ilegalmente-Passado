let registros = [];

const API = "http://localhost:3000/api/sustentabilidade";

let editando = null;


const tbody = document.getElementById("listaSustentabilidade");

const modal = document.getElementById("modal");

const form = document.getElementById("formRegistro");

const pesquisa = document.getElementById("pesquisa");


const consumoEnergia = document.getElementById("consumoEnergia");

const consumoAgua = document.getElementById("consumoAgua");

const quantidadeResiduos = document.getElementById("quantidadeResiduos");

const quantidadeReciclada = document.getElementById("quantidadeReciclada");

const data = document.getElementById("data");



document.getElementById("novoRegistro").onclick = abrirModal;

document.getElementById("cancelar").onclick = fecharModal;



window.onclick = (e)=>{

    if(e.target === modal){

        fecharModal();

    }

};




// BUSCAR DADOS DO BANCO

async function carregarRegistros(){

    try{


        const resposta = await fetch(API);


        if(!resposta.ok){

            throw new Error("Erro ao buscar registros.");

        }


        registros = await resposta.json();


        renderizar();


    }catch(erro){

        console.error(erro);

    }

}




// MODAL

function abrirModal(){

    modal.style.display = "flex";

}



function fecharModal(){

    modal.style.display = "none";

    form.reset();

    editando = null;


    document.getElementById("tituloModal").textContent =
    "Novo Registro";

}





// CALCULO RECICLAGEM

function calcularReciclagem(){

    const residuos = registros.reduce(

        (s,r)=>s + Number(r.quantidade_residuos),

        0

    );


    const reciclado = registros.reduce(

        (s,r)=>s + Number(r.quantidade_reciclada),

        0

    );


    if(residuos === 0){

        return 0;

    }


    return (reciclado / residuos) * 100;

}





// CARDS

function atualizarCards(){


    const energia = registros.reduce(

        (s,r)=>s + Number(r.consumo_energia),

        0

    );


    const agua = registros.reduce(

        (s,r)=>s + Number(r.consumo_agua),

        0

    );


    const residuos = registros.reduce(

        (s,r)=>s + Number(r.quantidade_residuos),

        0

    );



    document.getElementById("energiaTotal").textContent =

    energia.toLocaleString("pt-BR") + " kWh";



    document.getElementById("aguaTotal").textContent =

    agua.toLocaleString("pt-BR") + " L";



    document.getElementById("residuosTotal").textContent =

    residuos.toLocaleString("pt-BR") + " kg";



    document.getElementById("reciclagem").textContent =

    calcularReciclagem().toFixed(0) + "%";


}
// RENDERIZAR TABELA

function renderizar(lista = registros){


    tbody.innerHTML = "";


    lista.forEach(registro=>{


        const tr = document.createElement("tr");


        tr.innerHTML = `


        <td>${registro.consumo_energia} kWh</td>


        <td>${registro.consumo_agua} L</td>


        <td>${registro.quantidade_residuos} kg</td>


        <td>${registro.quantidade_reciclada} kg</td>


        <td>${registro.data_registro}</td>



        <td>


            <button

            class="btn btn-danger excluir"

            data-id="${registro.id_sustentabilidade}">


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


    if(!confirm("Deseja excluir este registro?"))

    return;



    await fetch(`${API}/${id}`,{


        method:"DELETE"


    });



    carregarRegistros();


}





// SALVAR

form.addEventListener("submit", async(e)=>{


    e.preventDefault();



    const registro = {


        consumo_energia:

        Number(consumoEnergia.value),



        consumo_agua:

        Number(consumoAgua.value),



        quantidade_residuos:

        Number(quantidadeResiduos.value),



        quantidade_reciclada:

        Number(quantidadeReciclada.value),



        data_registro:

        data.value


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


        body:JSON.stringify(registro)


    });



    await carregarRegistros();


    fecharModal();



});







// PESQUISA

pesquisa.addEventListener("keyup",filtrar);



function filtrar(){


    const texto = pesquisa.value.toLowerCase();



    const lista = registros.filter(r=>{


        return (

            String(r.data_registro)

            .toLowerCase()

            .includes(texto)

        );


    });



    renderizar(lista);


}





// INICIALIZAÇÃO

carregarRegistros();