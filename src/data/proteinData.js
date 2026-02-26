/**
 * Données de référence des besoins en protéines
 * exprimées en grammes par kilogramme de poids corporel et par jour.
 */

const proteinData = {
  sedentaire: { min: 0.8, max: 1.0, label: "Sédentaire" },
  endurance: { min: 1.2, max: 1.6, label: "Endurance" },
  maintien: { min: 1.6, max: 1.8, label: "Conservation masse musculaire" },
  masse: { min: 1.8, max: 2.2, label: "Prise de masse musculaire" }
};

export default proteinData;