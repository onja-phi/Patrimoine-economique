/*export default class Possession {
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement) {
    this.possesseur = possesseur;
    this.libelle = libelle;
    this.valeur = valeur;
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.tauxAmortissement = tauxAmortissement;
  }

  getValeur(date) {
    return this.getValeurApresAmortissement(this.valeur, this.tauxAmortissement, this.dateDebut, date);
  }

  getValeurApresAmortissement(valeur, tauxAmortissement, dateDebut, dateActuelle) {
    if (dateActuelle < dateDebut) {
      return 0;
    }
    const differenceDate = {
      year: dateActuelle.getFullYear() - dateDebut.getFullYear(),
      month: dateActuelle.getMonth() - dateDebut.getMonth(),
      day: dateActuelle.getDate() - dateDebut.getDate(),
    };
  
    var raison = differenceDate.year + differenceDate.month / 12 + differenceDate.day / 365;

    const result = valeur - valeur *(raison * tauxAmortissement / 100);
    return result;
  }
}




/**
 * class Possession {
  constructor(libelle, valeur, dateDebut, taux) {
    this.libelle = libelle;
    this.valeur = valeur;
    this.dateDebut = new Date(dateDebut);
    this.dateFin = null;
    this.taux = taux;
  }

  getValeur(date) {
    // Implémenter la logique pour calculer la valeur à une date donnée
    return this.valeur; // Exemple simplifié
  }
}

module.exports = Possession;

 */

export default class Possession {
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement) {
    this.possesseur = possesseur;
    this.libelle = libelle;
    this.valeur = valeur;
    this.dateDebut = new Date(dateDebut);
    this.dateFin = dateFin ? new Date(dateFin) : null;
    this.tauxAmortissement = tauxAmortissement;
  }

  getValeur(date) {
    return this.getValeurApresAmortissement(this.valeur, this.tauxAmortissement, this.dateDebut, date);
  }

  getValeurApresAmortissement(valeur, tauxAmortissement, dateDebut, dateActuelle) {
    if (dateActuelle < dateDebut) {
      return 0;
    }
    const differenceDate = {
      year: dateActuelle.getFullYear() - dateDebut.getFullYear(),
      month: dateActuelle.getMonth() - dateDebut.getMonth(),
      day: dateActuelle.getDate() - dateDebut.getDate(),
    };
  
    const raison = differenceDate.year + differenceDate.month / 12 + differenceDate.day / 365;

    const result = valeur - valeur * (raison * tauxAmortissement / 100);
    return result;
  }
}
