import { JsonDB, Config } from "node-json-db";
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // const db = new JsonDB(new Config("db", true, false, "/"));
  const filePath = path.resolve('.','db.json');
  console.log("request:"+req);
  if (req.method === "GET") {
    const jsonData = fs.readFileSync(filePath);

    const data = JSON.parse(jsonData.toString());
    // var data = await db.getData("/catchedPokemon");

    return res.status(200).json(data);
  } else if (req.method === "POST") {
    const dbPath = path.resolve('.', 'db.json');
    // Leer el archivo db.json
    const jsonData = fs.readFileSync(dbPath);
    const data = JSON.parse(jsonData.toString());
    const newPokemon = req.body.pokeData;
    data.catchedPokemon.push(newPokemon)
    // Guardar los datos actualizados en db.json
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    res.status(200).json(newPokemon);
  //   const index = await db.getIndex("/catchedPokemon", Number(req.body.id));

  //   if (index === -1) {
  //     await db.push("/catchedPokemon[]", newPokemon);
  //     return res.status(200).json(newPokemon);
  //   } else {
  //     return res.status(409).send("Pokemon ya existente");
  //   }
  }else{
    return res.status(405).send("Method not allowed.");
  }
}
