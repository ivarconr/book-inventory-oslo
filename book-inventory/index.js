var express = require('express');
var app = express();

app.use((req, res, next) =>{
  console.log(`incoming request at ${new Date()}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => console.log('Example app listening on http://localhost:3000!'));
