require('dotenv').config();
const express = require('express');
const path = require('path');
const loginHandler = require('./api/admin/login');
const listingsHandler = require('./api/admin/listings');
const messagesHandler = require('./api/admin/messages');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.all('/api/admin/login', loginHandler);
app.all('/api/admin/listings', listingsHandler);
app.all('/api/admin/messages', messagesHandler);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
