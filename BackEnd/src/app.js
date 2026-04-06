const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');




const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/ai', aiRoutes);

module.exports = app;