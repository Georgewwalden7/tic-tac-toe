const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Express is listening on port: ${port}`);
});

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', 
(req, res) => {
    res.render('index');
});
