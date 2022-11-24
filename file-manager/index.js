const express = require('express'),
      fs = require('fs').promises,
      app = express(),
      port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.table([{ Timestamp: new Date().toLocaleString(), Method: req.method, Request: req.originalUrl }]);
  next();
});

app.get('/', (req, res) => {
  return res.send('<h1>File manager working</h1>');
});

app.post('/create', async(req, res) => {
  const filename = req.body['filename'] || 'process.json';

  const content = JSON.stringify([]);
  await fs.writeFile(`files/${filename}`, content, 'utf-8');

  return res.json({ok: true});
});

app.post('/append', async(req, res) => {
  const filename = req.body['filename'] || 'process.json';
  const process = req.body['process'] || {};

  const readText = await fs.readFile(`files/${filename}`);
  const savedProcess = JSON.parse(readText);

  if(!savedProcess || !Array.isArray(savedProcess)){
    savedProcess = [];
  }

  savedProcess.push(process);
  const newContent = JSON.stringify(savedProcess);

  await fs.appendFile(`files/${filename}`, newContent, 'utf-8');
  return res.json({ok: true});
});

app.put('/remove-first', async(req, res) => {
  const filename = req.body['filename'] || 'process.json';
  const readText = await fs.readFile(`files/${filename}`);
  const content = JSON.parse(readText);

  if(!Array.isArray(content) || content.length == 0){
    return res.json({ ok: false });
  }

  const process = content.shift();
  const newContent = JSON.stringify(content);

  await fs.writeFile(`files/${filename}`, newContent, 'utf-8');

  return res.json({
    ok: true,
    process
  });
});

app.listen(port, () => {
  console.log(`File manager app running on port ${port}`);
});