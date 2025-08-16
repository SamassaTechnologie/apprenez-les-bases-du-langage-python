function saveToHistory(title, content) {
    let history = JSON.parse(localStorage.getItem("docHistory") || "[]");
    let newDoc = {
        title: title || `Document ${history.length + 1}`,
        content: content,
        date: new Date().toLocaleString()
    };
    history.unshift(newDoc);
    localStorage.setItem("docHistory", JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    let history = JSON.parse(localStorage.getItem("docHistory") || "[]");
    let container = document.getElementById("history-list");
    container.innerHTML = "";
    history.forEach((doc, index) => {
        let div = document.createElement("div");
        div.classList.add("history-item");
        div.innerHTML = `
            <strong>${doc.title}</strong> <br>
            <small>${doc.date}</small> <br>
            <button onclick="openHistory(${index})">Ouvrir</button>
            <button onclick="deleteHistory(${index})">Supprimer</button>
        `;
        container.appendChild(div);
    });
}

function openHistory(index) {
    let history = JSON.parse(localStorage.getItem("docHistory") || "[]");
    if (history[index]) {
        document.getElementById("form-container").innerText = history[index].content;
    }
}

function deleteHistory(index) {
    let history = JSON.parse(localStorage.getItem("docHistory") || "[]");
    history.splice(index, 1);
    localStorage.setItem("docHistory", JSON.stringify(history));
    loadHistory();
}

document.addEventListener("DOMContentLoaded", loadHistory);
