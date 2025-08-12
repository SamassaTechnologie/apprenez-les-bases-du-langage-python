document.getElementById('generateAI').addEventListener('click', async function () {
  const typeDoc = document.getElementById('typeDoc').value;
  const nom = document.getElementById('nom').value;
  const details = document.getElementById('details').value;

  if (!typeDoc || !nom || !details) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  document.getElementById('result').innerText = "Génération en cours...";
  document.getElementById('downloadPDF').style.display = 'none';

  // Appel à la Netlify Function
  try {
    const response = await fetch('/.netlify/functions/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ typeDoc, nom, details })
    });
    const data = await response.json();
    if (data.result) {
      document.getElementById('result').innerText = data.result;
      document.getElementById('downloadPDF').style.display = 'block';
    } else {
      document.getElementById('result').innerText = "Une erreur est survenue.";
    }
  } catch (e) {
    document.getElementById('result').innerText = "Erreur de connexion.";
  }
});

// Génération du PDF avec jsPDF
document.getElementById('downloadPDF').addEventListener('click', function () {
  const doc = new window.jspdf.jsPDF();
  doc.text(document.getElementById('result').innerText, 10, 10);
  doc.save('document.pdf');
});
