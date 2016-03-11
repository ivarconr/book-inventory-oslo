var heroin = require('heroin-js');
var _ = require('lodash');
var base = require('./base');

var test = {
  name: 'book-inventory-oslo-test',
  config_vars: {
    NODE_ENV: 'production'
  },
  domains: ['book-inventory-oslo-test.herokuapp.com']
};

var config = _.merge({}, base, test);

var configurator = heroin(process.env.HEROKU_API_TOKEN);
configurator(config);
