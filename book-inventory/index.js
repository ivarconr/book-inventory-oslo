var repo = require('./stockRepository.js');
var app = require('./app')(repo);

app.listen(3000, () => console.log('Example app listening on http://localhost:3000!'));
