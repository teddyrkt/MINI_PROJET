import { jsPDF } from "jspdf";

/**
 * Exporte les données en CSV
 */

export function exportCSV(weights, goals, proteinData, calculateProteins) {
  //On exporte rien si aucune donnée
  if (weights.length === 0 || goals.length === 0) return;

  let csvContent = "Poids (kg),";

  // En-têtes
  csvContent += goals.map(g => proteinData[g].label).join(",") + "\n";

  // Lignes
  weights.forEach(weight => {
    let row = `${weight},`;

    row += goals
      .map(g => calculateProteins(weight, g))
      .join(",");

    csvContent += row + "\n";
  });

  // Création du fichier CSV et déclenchement du téléchargement
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "proteines.csv";
  link.click();
}


/**
 * Exporte les données en PDF
 */
export function exportPDF(weights, goals, proteinData, calculateProteins) {
  //On exporte rien si aucune donnée
  if (weights.length === 0 || goals.length === 0) return;

  const doc = new jsPDF();
  let y = 10;

  // Titre du document
  doc.setFontSize(16);
  doc.text("Tableau des besoins en protéines", 10, y);
  y += 10;

  // En-têtes dynamiques
  const headers = ["Poids (kg)", ...goals.map(g => proteinData[g].label)];
  doc.setFontSize(10);
  doc.text(headers.join(" | "), 10, y);
  y += 8;

  // Génération des lignes du tableau
  weights.forEach(weight => {
    const row = [
      weight,
      ...goals.map(g => calculateProteins(weight, g))
    ];

    doc.text(row.join(" | "), 10, y);
    y += 8;
  });
  
  // Téléchargement du fichier PDF
  doc.save("proteines.pdf");
}