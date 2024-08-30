let possessions = []; 

const getPossessions = (req, res) => {
  res.status(200).json(possessions);
};

//Create new possession
const createPossession = (req, res) => {
  const { libelle, valeur, dateDebut, taux } = req.body;
  const newPossession = { libelle, valeur, dateDebut, taux, dateFin: null };
  possessions.push(newPossession);
  res.status(201).json(newPossession);
};

// Update a possession by libelle
const updatePossession = (req, res) => {
  const { libelle } = req.params;
  const { dateFin } = req.body;
  let possession = possessions.find(p => p.libelle === libelle);
  if (possession) {
    possession.dateFin = dateFin;
    res.status(200).json(possession);
  } else {
    res.status(404).json({ message: "Possession not found" });
  }
};

// Close a possession by setting its dateFin to the current date
const closePossession = (req, res) => {
  const { libelle } = req.params;
  let possession = possessions.find(p => p.libelle === libelle);
  if (possession) {
    possession.dateFin = new Date().toISOString();
    res.status(200).json(possession);
  } else {
    res.status(404).json({ message: "Possession not found" });
  }
};

// Get Valeur Patrimoine for a specific date
const getValeurPatrimoine = (req, res) => {
  const { date } = req.params;
  const dateObj = new Date(date);
  let totalValeur = possessions.reduce((sum, possession) => {
    return sum + getValeurPossession(possession, dateObj);
  }, 0);
  res.status(200).json({ date, valeur: totalValeur });
};

// Get Valeur Patrimoine over a range
const getValeurPatrimoineRange = (req, res) => {
  const { type, dateDebut, dateFin, jour } = req.body;
  res.status(200).json({ message: "Valeur Patrimoine Range" });
};

const getValeurPossession = (possession, date) => {
  // Logique pour calculer la valeur d'une possession à une date donnée
  return possession.valeur; // Exemple simplifié
};

module.exports = {
  getPossessions,
  createPossession,
  updatePossession,
  closePossession,
  getValeurPatrimoine,
  getValeurPatrimoineRange,
};