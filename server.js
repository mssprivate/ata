const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();      
app.use(cors());            
app.use(express.json());

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

let db;

async function conectar() {
  await client.connect();
  db = client.db("local");
  console.log("MongoDB conectado");
}

conectar();

/* ===== ROTAS ===== */
app.get("/personagem/:Nome", async (req, res) => {
  const personagem = await db
    .collection("personagem")
    .findOne({ Nome: { $regex: `^${req.params.Nome}$`, $options: "i" } });

  res.json(personagem);
});

/* ================ */

app.listen(3000, () => {
  console.log("Servidor em http://localhost:3000");
});
