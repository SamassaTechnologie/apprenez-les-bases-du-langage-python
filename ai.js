async function generateWithAI(action) {
    let content = document.getElementById('form-container').innerText;

    if (!content.trim()) {
        alert("Veuillez remplir le document avant d'utiliser l'IA.");
        return;
    }

    try {
        let response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: content, mode: action })
        });

        let data = await response.json();
        if (data.output) {
            document.getElementById('form-container').innerText = data.output;
        } else {
            alert("Erreur : " + (data.error || "Réponse vide"));
        }
    } catch (error) {
        alert("Erreur de connexion au serveur IA");
        console.error(error);
    }
}
