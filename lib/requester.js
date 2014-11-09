var xtend   = require('util')._extend;
var request = require('request');

module.exports = Requester;

function Requester(opts) {
  var token   = opts.token;
  var baseUrl = 'https://slack.com/api/' || opts.baseUrl;

  return {
    perform: perform
  }

  function perform(action, responseKey) {
    return function interface(qs, cb) {

      if(typeof qs === 'function') {
        cb      = qs;
        qs      = {};
      }

      var url = [baseUrl, action].join('');

      var options = {
        method: 'GET',
        url: url,
      }

      var defaultQs = {
        token: token
      }

      var queryString = xtend(defaultQs, qs);

      var req = {
        qs: queryString,
        url: options.url,
        method: options.method,
      }

      request(req, handleRequest);

      function handleRequest(error, response) {
        if(error) return cb(error);

        response = {
          raw: response,
          json: JSON.parse(response.body)
        }

        if(responseKey) return cb(null, response.json[responseKey], response);
        return cb(null, response);
      }
    }
  }
}