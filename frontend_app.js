document.getElementById('generateAI').addEventListener('click', async function () {
  const typeDoc = document.getElementById('typeDoc').value;
  const nom = document.getElementById('nom').value;
  const details = document.getElementById('details').value;

  if (!typeDoc || !nom || !details) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  // Appel à l'API backend pour génération IA
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ typeDoc, nom, details })
  });
  const data = await response.json();

  document.getElementById('result').innerText = data.result;
  document.getElementById('downloadPDF').style.display = 'block';
});

// Génération du PDF avec jsPDF
document.getElementById('downloadPDF').addEventListener('click', function () {
  const doc = new window.jspdf.jsPDF();
  doc.text(document.getElementById('result').innerText, 10, 10);
  doc.save('document.pdf');
});