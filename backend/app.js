const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/textToAudio', async (req, res) => {
  const { transcript } = req.body;
  try {
  } catch (error) {}
});

app.listen(PORT, () => {
  console.log('App is listening on port');
});
