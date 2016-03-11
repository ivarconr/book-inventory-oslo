var repo = require('./stockRepository.js');
var app = require('./app')(repo);
var PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Example app listening on http://localhost:3000!'));
