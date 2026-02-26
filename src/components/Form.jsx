/**
 * Composant Form
 * Gère la saisie des paramètres utilisateur :
 * - Poids minimum
 * - Poids maximum
 * - Nombre de lignes
 * - Objectifs sportifs
 */

function Form({
  minWeight,
  setMinWeight,
  maxWeight,
  setMaxWeight,
  rows,
  setRows,
  goals,
  setGoals
}) {

  //Ajoute ou retire un objectif du tableau "goals"
  const handleGoalChange = (goal) => {
    if (goals.includes(goal)) {
      setGoals(goals.filter(g => g !== goal));
    } else {
      setGoals([...goals, goal]);
    }
  };

  return (
    <div>
      <h2>Saisissez vos informations</h2>

      {/* ===== Champs numériques ===== */}
      <div>
        <label>Poids minimum :</label>
        <input
          type="number"
          value={minWeight}
          onChange={(e) => setMinWeight(e.target.value)}
        />
      </div>

      <div>
        <label>Poids maximum :</label>
        <input
          type="number"
          value={maxWeight}
          onChange={(e) => setMaxWeight(e.target.value)}
        />
      </div>

      <div>
        <label>Nombre de lignes :</label>
        <input
          type="number"
          value={rows}
          onChange={(e) => setRows(e.target.value)}
        />
      </div>

      {/* ===== Sélection des objectifs ===== */}
      <div>
        <p>Objectifs :</p>

        <div className="checkbox-group">

          <label className="checkbox-item">
            <input
              type="checkbox"
              checked={goals.includes("sedentaire")}
              onChange={() => handleGoalChange("sedentaire")}
            />
            Sédentaire
          </label>

          <label className="checkbox-item">
            <input
              type="checkbox"
              checked={goals.includes("endurance")}
              onChange={() => handleGoalChange("endurance")}
            />
            Endurance
          </label>

          <label className="checkbox-item">
            <input
              type="checkbox"
              checked={goals.includes("maintien")}
              onChange={() => handleGoalChange("maintien")}
            />
            Maintien musculaire
          </label>

          <label className="checkbox-item">
            <input
              type="checkbox"
              checked={goals.includes("masse")}
              onChange={() => handleGoalChange("masse")}
            />
            Prise de masse
          </label>

        </div>
      </div>
    </div>
  );
}

export default Form;
