require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'Medusa-X', time: new Date().toISOString() });
});

app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, name: 'Medusa T-Shirt', price: 999 },
    { id: 2, name: 'Medusa Hoodie', price: 1999 },
    { id: 3, name: 'Medusa Cap', price: 499 }
  ]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
