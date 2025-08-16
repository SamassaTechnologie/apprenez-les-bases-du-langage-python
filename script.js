
function loadCategory(category) {
    let formContainer = document.getElementById('form-container');
    
    if (category === 'lettres') {
        formContainer.innerHTML = `
            <h3>Lettre administrative</h3>
            <label>Nom : <input type="text" id="nom"></label><br>
            <label>Prénom : <input type="text" id="prenom"></label><br>
            <label>Objet : <input type="text" id="objet"></label><br>
            <label>Message : <textarea id="message"></textarea></label><br>
            <button onclick="generateDocument()">Générer Document</button>
        `;
    } else if (category === 'certificats') {
        formContainer.innerHTML = `
            <h3>Certificat</h3>
            <label>Nom : <input type="text" id="nom"></label><br>
            <label>Type de certificat : <input type="text" id="type"></label><br>
            <button onclick="generateDocument()">Générer Document</button>
        `;
    } else {
        formContainer.innerHTML = "<p>Formulaire bientôt disponible...</p>";
    }
}

function generateDocument() {
    alert("Ici, le document sera généré et prêt à être exporté.");
}
function filterCategory(category) {
    document.getElementById("form-container").innerHTML =
        `<p>📂 Vous avez choisi la catégorie : <b>${category}</b>. Sélectionnez un modèle pour continuer.</p>`;
}
