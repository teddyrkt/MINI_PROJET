function ProteinTable({ weights, goals, calculateProteins, proteinData }) {
  // Ne rien afficher si aucune donnée valide
  if (weights.length === 0 || goals.length === 0) return null;

  return (
    <div className="table-wrapper">
        <table border="1" cellPadding="8">

        {/* ===== En-têtes du tableau ===== */}
        <thead>
            <tr>
            <th>Poids (kg)</th>
            {goals.map((g) => (
                <th key={g}>{proteinData[g].label}</th>
            ))}
            </tr>
        </thead>

        {/* ===== Corps du tableau ===== */}
        <tbody>
            {weights.map((w, i) => (
            <tr key={i}>
                <td>{w}</td>
                {goals.map((g) => (
                <td key={g}>
                    {calculateProteins(w, g)}
                </td>
                ))}
            </tr>
            ))}
        </tbody>
        </table>
    </div>

  );
}

export default ProteinTable;