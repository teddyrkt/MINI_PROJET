import { useState } from "react";
import './App.css';
import Form from "./components/Form";
import proteinData from "./data/proteinData";
import ProteinTable from "./components/ProteinTable";
import { exportCSV, exportPDF } from "./utils/export";

/**
 * Composant principal de l'application. Per
 * Il centralise la logique principale de l’application (state, calculs, validation et rendu conditionnel).
 */

function App() {
  const [minWeight, setMinWeight] = useState(""); // Poids min saisi par l'utilisateur
  const [maxWeight, setMaxWeight] = useState(""); // Poids max saisi par l'utilisateur
  const [rows, setRows] = useState("");  // Nombre de lignes à générer
  const [goals, setGoals] = useState([]); // Objectifs sélectionnés (tableau de clés)
  const [showExportMenu, setShowExportMenu] = useState(false); // Gestion de l'affichage du menu d’export

  // Conversion des valeurs string en number pour les calculs
  const min = Number(minWeight);
  const max = Number(maxWeight);
  const count = Number(rows);


  // Génère un tableau de poids répartis entre le poids minimum et maximum selon le nombre de lignes choisi.
  const generateWeights = () => {
    if (minWeight === "" || maxWeight === "" || rows === "") return [];

    const step = (max - min) / (count - 1);
    const weights = [];
    
    for (let i = 0; i < count; i++) {
      weights.push(Math.round(min + step * i));
    }

    return weights;
  };

  const weights = generateWeights(); // Tableau final des poids calculés dynamiquement


  // Calcule la plage de protéines (min - max)pour un poids donné et un objectif sélectionné.
  const calculateProteins = (weight, goalKey) => {
    const goal = proteinData[goalKey];

    if (!goal) return "";

    const min = Math.round(weight * goal.min);
    const max = Math.round(weight * goal.max);

    return `${min} - ${max} g/jour`;
  };

  let errorMessage = "";

  // Validation en temps réel
  if (minWeight && min < 0) {
    errorMessage = "Le poids minimum doit être positif.";
  }
  else if (maxWeight && max < 0) {
    errorMessage = "Le poids maximum doit être positif.";
  }
  else if (rows && count <= 1) {
    errorMessage = "Le nombre de lignes doit être supérieur à 1.";
  }
  else if (minWeight && maxWeight && min >= max) {
    errorMessage = "Le poids minimum doit être inférieur au poids maximum.";
  }
  else if (minWeight && maxWeight && rows && goals.length === 0) {
    errorMessage = "Veuillez sélectionner au moins un objectif.";
  }

  return (
    <div className="app">
      <div className="container">
        <h1>CALCULONS VOS BESOINS EN PROTÉINES</h1>
        {/* Formulaire de saisie */}
        <Form
          minWeight={minWeight}
          setMinWeight={setMinWeight}
          maxWeight={maxWeight}
          setMaxWeight={setMaxWeight}
          rows={rows}
          setRows={setRows}
          goals={goals}
          setGoals={setGoals}
        />
        {/* Affichage conditionnel du message d'erreur */}
        {errorMessage && (
          <p className="error">{errorMessage}</p>
        )}
        {/* Affichage conditionnel du tableau */}
        {!errorMessage && (
          <ProteinTable
            weights={weights}
            goals={goals}
            calculateProteins={calculateProteins}
            proteinData={proteinData}
          />
        )}
        {/* Menu d’export CSV / PDF */}
        <div className="export-wrapper">
        <button
          className="export-btn"
          disabled={errorMessage}
          onClick={() => setShowExportMenu(!showExportMenu)}
        >
          Exporter ▼
        </button>

          {showExportMenu && (
            <div className="export-menu">
              <div onClick={() => {
                exportCSV(weights, goals, proteinData, calculateProteins);
                setShowExportMenu(false);
              }}>
                CSV
              </div>
              <div onClick={() => {
                exportPDF(weights, goals, proteinData, calculateProteins);
                setShowExportMenu(false);
              }}>
                PDF
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default App;