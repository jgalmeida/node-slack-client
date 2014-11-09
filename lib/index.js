var assert  = require('assert');

var UserActions     = require('./actions/user-actions');
var ChannelsActions = require('./actions/channel-actions');

module.exports = Client;

function Client(token, opts) {
  assert(token, 'Token is required!');

  opts = opts || {};
  opts.token = token;

  var client = {};

  var Requester = require('./requester')(opts);

  //Users
  client.usersList = UserActions.usersList(Requester);

  //Channels
  client.channelsList    = ChannelsActions.channelsList(Requester);
  client.channelsHistory = ChannelsActions.channelsHistory(Requester);

  return client;
}