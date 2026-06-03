const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(helmet());
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Only start the server if this file is run directly (not imported in tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
