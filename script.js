// Récupération des éléments
const form = document.querySelector('form');
const fileInput = document.querySelector('input[type="file"]');
const fileList = document.querySelector('.file-list');

// Fonction d'ajout de fichier à la liste
function ajouterFichier(nomFichier) {
  const li = document.createElement('li');
  li.innerHTML = `${nomFichier} <span class="delete">🗑</span>`;
  fileList.appendChild(li);

  // Gestion de la suppression
  li.querySelector('.delete').addEventListener('click', () => {
    li.remove();
    sauvegarderListe();
  });

  sauvegarderListe();
}

// Sauvegarde dans le stockage local du navigateur
function sauvegarderListe() {
  const fichiers = [];
  document.querySelectorAll('.file-list li').forEach(li => {
    fichiers.push(li.textContent.replace('🗑', '').trim());
  });
  localStorage.setItem('documents', JSON.stringify(fichiers));
}

// Chargement au démarrage
function chargerListe() {
  const fichiers = JSON.parse(localStorage.getItem('documents')) || [];
  fichiers.forEach(fichier => ajouterFichier(fichier));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (fileInput.files.length > 0) {
    ajouterFichier(fileInput.files[0].name);
    fileInput.value = '';
  }
});

// Initiafunction mettreAJourDashboard() {
  const fichiers = JSON.parse(localStorage.getItem('documents')) || [];
  document.getElementById('doc-count').textContent = `📄 Documents : ${fichiers.length}`;
  document.getElementById('client-count').textContent = `👥 Clients : ${fichiers.length}`; // à affiner plus tard
  document.getElementById('last-update').textContent = `📅 Dernière mise à jour : ${new Date().toLocaleDateString()}`;
}

// Appelle cette fonction après chaque ajout/suppression
function sauvegarderListe() {
  const fichiers = [];
  document.querySelectorAll('.file-list li').forEach(li => {
    fichiers.push(li.textContent.replace('🗑', '').trim());
  });
  localStorage.setItem('documents', JSON.stringify(fichiers));
  mettreAJourDashboard();
}
function ouvrirModele(type) {
  alert(`Ouverture du modèle : ${type.toUpperCase()}\n(Fonction à développer)`);
  // Plus tard : ouvrir une page ou formulaire avec champs modifiables
}
chargerListe();
mettreAJourDashboard();lisation
chargerListe();
