var Requester = require('../requester');

module.exports = {
  channelsList:    ChannelsList,
  channelsHistory: ChannelsHistory
}

function ChannelsList(requester) {
  var action      = 'channels.list';
  var responseKey = 'channels';

  return requester.perform(action, responseKey);
}

function ChannelsHistory(requester) {
  var action      = 'channels.history';
  var responseKey = 'messages';

  return requester.perform(action, responseKey);
}