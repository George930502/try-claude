const express = require('express');
const app = express();
const userRoutes = require('./routes/users');

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to try-claude API' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// User routes
app.use('/api/users', userRoutes);

module.exports = app;
