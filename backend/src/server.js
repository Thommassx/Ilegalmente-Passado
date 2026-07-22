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


app.use("/api/maquinas", maquinasRoutes);
app.use("/api/producao", producaoRoutes);


app.listen(3000, ()=>{
    console.log("Servidor rodando na porta 3000");
});