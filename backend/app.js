const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const multer = require('multer');
const fs = require('fs');

const PORT = process.env.PORT;
const app = express();
const genAi = new GoogleGenerativeAI(process.env.AI_APIKEY);

const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/processAudio', upload.single('audio'), async (req, res) => {
  // const { transcript } = req.body;
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file uploaded' });
    }

    const audioFile = req.file;

    debugger;

    const model = genAi.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    const prompt = `Generate a transcript of the speech.`;
    const result = await model.generateContent([
      {
        fileData: {
          mimeType: audioFile.mimeType,
          fileUri: audioFile.uri,
        },
      },
      { text: prompt },
    ]);

    const audioTranscript = result.response.text();

    debugger;
    res.json({
      audioTranscript: audioTranscript,
    });
  } catch (error) {
    console.log('Failed to process audio error', error);
    res.status(500).json({ error: 'Failed to process audio' });
  }
});

app.listen(PORT, () => {
  console.log('App is listening on port');
});
