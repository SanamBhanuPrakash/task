// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Replace with your OpenAI API key
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY';

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/generate-steps', async (req, res) => {
  const { task } = req.body;

  // Send the task to OpenAI's API
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are an assistant who helps break tasks into step-by-step instructions.' },
          { role: 'user', content: `Break down the following task into steps: ${task}` }
        ],
        max_tokens: 150
      })
    });

    const data = await response.json();
    const stepsText = data.choices[0].message.content;

    // Split steps based on line breaks or numbering
    const steps = stepsText.split('\n').filter(step => step.trim());

    res.json({ steps });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error generating steps' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
