const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req,res)=>{
    res.send("EcoFactory API funcionando!");
});


const maquinasRoutes = require("./routes/maquinas");
const producaoRoutes = require("./routes/producao");
const sustentabilidadeRoutes = require("./routes/sustentabilidade");
const segurancaRoutes = require("./routes/seguranca");
const dashboardRoutes = require("./routes/dashboard");

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/seguranca", segurancaRoutes);
app.use("/api/sustentabilidade", sustentabilidadeRoutes);
app.use("/api/maquinas", maquinasRoutes);
app.use("/api/producao", producaoRoutes);


app.listen(3000, ()=>{
    console.log("Servidor rodando na porta 3000");
});