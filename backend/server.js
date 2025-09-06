import express from 'express';
const app = express();
const PORT = 3000;

app.get('/api/name', (req, res) => {
  res.json({ name: 'Santu Das' });
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
