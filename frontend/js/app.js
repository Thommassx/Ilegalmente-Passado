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
                data: [6200, 7100, 6950, 8100, 8540, 7900, 8300],
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

const dashboard = {

    maquinasAtivas: 18,

    producaoHoje: 8540,

    energia: 620,

    ocorrencias: 2

};

function atualizarDashboard() {

    document.getElementById("maquinasAtivas").textContent =
        dashboard.maquinasAtivas;

    document.getElementById("producaoHoje").textContent =
        dashboard.producaoHoje.toLocaleString("pt-BR");

    document.getElementById("energia").textContent =
        dashboard.energia + " kWh";

    document.getElementById("ocorrencias").textContent =
        dashboard.ocorrencias;

}

atualizarDashboard();

function atualizarHora() {

    const agora = new Date();

    const horas = agora.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    document.title = `EcoFactory | ${horas}`;

}

setInterval(atualizarHora,1000);

const notification = document.querySelector(".notification");

if(notification){

notification.addEventListener("click",()=>{

    alert(
`Notificações

• Produção diária concluída

• Nova manutenção registrada

• Relatório disponível

• Meta de produção atingida`
    );

});

}

const profile = document.querySelector(".profile");

if(profile){

profile.addEventListener("click",()=>{

alert("Administrador\nEcoFactory");

});

}

const progresso = document.querySelectorAll(".progress div");

progresso.forEach(bar=>{

const largura = bar.style.width;

bar.style.width="0";

setTimeout(()=>{

bar.style.width=largura;

bar.style.transition="1.2s";

},300);

});

const cards = document.querySelectorAll(".card");

cards.forEach((card,index)=>{

card.style.opacity="0";

card.style.transform="translateY(25px)";

setTimeout(()=>{

card.style.opacity="1";

card.style.transform="translateY(0)";

card.style.transition=".5s";

},index*150);

});

setInterval(()=>{

dashboard.producaoHoje += Math.floor(Math.random()*25);

dashboard.energia += Math.floor(Math.random()*3);

atualizarDashboard();

},7000);

const tabela = document.getElementById("tabelaMaquinas");

const maquinas = [

{
nome:"CNC-01",
setor:"Usinagem",
status:"ativo"
},

{
nome:"Solda-05",
setor:"Soldagem",
status:"ativo"
},

{
nome:"Prensa-03",
setor:"Montagem",
status:"manutencao"
},

{
nome:"Laser-08",
setor:"Corte",
status:"ativo"
},

{
nome:"Torno-02",
setor:"Usinagem",
status:"parado"
}

];

function renderTabela(){

if(!tabela) return;

tabela.innerHTML="";

maquinas.forEach(maquina=>{

const tr=document.createElement("tr");

let texto="";

if(maquina.status==="ativo"){

texto="Em operação";

}

if(maquina.status==="manutencao"){

texto="Manutenção";

}

if(maquina.status==="parado"){

texto="Parada";

}

tr.innerHTML=`

<td>${maquina.nome}</td>

<td>${maquina.setor}</td>

<td>

<span class="status ${maquina.status}">
${texto}
</span>

</td>

`;

tabela.appendChild(tr);

});

}

renderTabela();

document.addEventListener("keydown",(e)=>{

if(e.key.toLowerCase()==="d"){

document.body.classList.toggle("dark");

}

});