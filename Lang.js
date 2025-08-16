let currentLang = localStorage.getItem("appLang") || "fr";
let translations = {};

function loadTranslations(callback) {
    fetch("lang.json")
        .then(res => res.json())
        .then(data => {
            translations = data;
            applyTranslations();
            if (callback) callback();
        });
}

function applyTranslations() {
    document.querySelectorAll("[data-translate]").forEach(el => {
        let key = el.getAttribute("data-translate");
        if (translations[currentLang] && translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });

    document.querySelectorAll("[data-placeholder]").forEach(el => {
        let key = el.getAttribute("data-placeholder");
        if (translations[currentLang] && translations[currentLang][key]) {
            el.setAttribute("placeholder", translations[currentLang][key]);
        }
    });
}

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("appLang", lang);
    applyTranslations();
}

document.addEventListener("DOMContentLoaded", () => {
    loadTranslations();
});
