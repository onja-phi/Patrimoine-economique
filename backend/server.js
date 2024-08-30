import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors"

import Possession from "../models/possessions/Possession.js";
import possessions from "../data/data.json" assert { type: 'json' }; 
const app = express();
import { writeFile } from '../data/index.js';
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send(possessions);
});

app.get('/possession', (req, res) => {
  res.status(200).json(possessions);
});

// Creation Possession
app.post('/possession', (req, res) => {
  const { libelle, valeur, dateDebut, taux } = req.body;
  if (!libelle || !valeur || !dateDebut || !taux) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const newPossession = new Possession({"nom": "Jj"}, libelle, valeur, dateDebut, taux);
  possessions.push(newPossession);
  writeFile("../data/data.json", possessions);
  res.status(201).json(newPossession);
});

// Update possession by libelle
app.put('/possession/:libelle', (req, res) => {
  const { libelle: reqLibelle } = req.params;
  const { dateFin, libelle } = req.body;
  
  possessions.map((p)=>{ 
      if(p.libelle = reqLibelle){
        p.dateFin = dateFin;
        p.libelle = libelle;
        res.json(p);
      }
  });

  writeFile("../data/data.json", possessions)
  res.send();
});

app.put('/possession/:libelle/close', (req, res) => {
  const { libelle: reqLibelle } = req.params;
  const { dateFin, libelle } = req.body;

  possessions.map((p)=>{
    if(p.libelle = reqLibelle){
      p.dateFin = (new Date()).toISOString();
      res.json(p);
    }
  })
});

app.get('/patrimoine/:date', (req, res) => {
  const { date } = req.params;

  const patrimoineValue = possessions.reduce((total, possession) => {
    const isActiveOnDate = new Date(possession.dateDebut) <= new Date(date) && 
                           (!possession.dateFin || new Date(possession.dateFin) >= new Date(date));
    return isActiveOnDate ? total + possession.valeur : total;
  }, 0);

  res.status(200).json({ date, valeur: patrimoineValue });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});