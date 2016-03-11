var heroin = require('heroin-js');
var _ = require('lodash');
var base = require('./base');

var prod = {
  name: 'book-inventory-oslo',
  config_vars: {
    NODE_ENV: 'production'
  },
  domains: ['book-inventory-oslo.herokuapp.com']
};

var config = _.merge({}, base, prod);

var configurator = heroin(process.env.HEROKU_API_TOKEN);
configurator(config);
