const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configuration OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Génération IA
app.post('/api/generate', async (req, res) => {
  const { typeDoc, nom, details } = req.body;
  const prompt = `Rédige un ${typeDoc} professionnel pour ${nom} avec les détails suivants : ${details}`;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    const result = completion.data.choices[0].message.content;
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Pour servir les fichiers statiques du frontend
app.use(express.static('../frontend'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));