import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.post("/api/generate", async (req, res) => {
    const { text, mode } = req.body;

    let prompt = "";
    if (mode === "completer") {
        prompt = `Complète le texte suivant de manière claire et correcte :\n${text}`;
    } else if (mode === "reformuler") {
        prompt = `Reformule ce texte pour le rendre plus professionnel :\n${text}`;
    } else if (mode === "corriger") {
        prompt = `Corrige les fautes dans ce texte :\n${text}`;
    }

    try {
        const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }]
            })
        });

        const data = await aiResponse.json();
        res.json({ output: data.choices?.[0]?.message?.content || "" });
    } catch (error) {
        res.status(500).json({ error: "Erreur IA : " + error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));
