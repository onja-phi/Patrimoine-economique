import Possession from "./Possession.js";

export default class Flux extends Possession {
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, jour) {
    super(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);
    this.jour = jour;
    this.valeurConstante = valeur;
  }

  getValeur(date) {
    console.log(`Calcul de la valeur pour ${this.libelle} le ${date.toISOString().split('T')[0]}`);
    
    const nombreDeMois = (debut, dateEvaluation, jourJ) => {
      let compteur = 0;

      if (debut.getDate() <= jourJ) {
        compteur++;
      }

      if (dateEvaluation.getDate() >= jourJ && !(debut.getFullYear() === dateEvaluation.getFullYear() && debut.getMonth() === dateEvaluation.getMonth())) {
        compteur++;
      }

      let totalMois = (dateEvaluation.getFullYear() - debut.getFullYear()) * 12 + (dateEvaluation.getMonth() - debut.getMonth());

      compteur += Math.max(0, totalMois);

      return compteur;
    };

    const totalMois = nombreDeMois(this.dateDebut, date, this.jour);
    const montantTotal = totalMois * this.valeurConstante;

    console.log(`Nombre de mois calculé: ${totalMois}, Montant total pour ${this.libelle} le ${date.toISOString().split('T')[0]}: ${montantTotal}`);
    return montantTotal;
  }
}
