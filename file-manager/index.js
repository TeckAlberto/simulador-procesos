const express = require('express'),
    app = express(),
    port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/create', (req, res) => {
    res.send('Create file!')
});

app.get('/append', (req, res) => {
    res.send('Append to file!')
});

app.get('/remove-first', (req, res) => {
    res.send('Remove first!')
});

app.listen(port, () => {
  console.log(`File manager app running on port ${port}`);
});