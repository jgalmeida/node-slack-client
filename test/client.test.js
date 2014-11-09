var assert = require('chai').assert;

var Client = require('../');
var FakeResponses = require('./fake-responses');

var nock = require('nock');

function assertResults(scope, done , err, result, rawResponse) {
  scope.done();
  assert.notOk(err);
  assert.ok(result);
  assert.ok(rawResponse);
  assert.deepEqual(result, result);
  done();
}

describe('Slack API client', function() {
  var slack;

  it('Fails initialization without token', function(done) {
    assert.throws(function() { Client(); });
    done();
  })

  it('Initializes with a token', function(done) {
    slack = Client('FAKE');
    assert.ok(slack);
    done();
  })

  describe('actions', function() {

    it('usersList', function(done) {
      var resp  = FakeResponses.UsersList;

      var scope = nock('https://slack.com')
                    .get('/api/users.list?token=FAKE')
                    .reply(200, resp);

      slack.usersList(function(err, result, rawResponse) {
        assertResults(scope, done, err, result, rawResponse);
      });
    })

    it('channelsList', function(done) {
      var resp  = FakeResponses.ChannelsList;

      var scope = nock('https://slack.com')
                    .get('/api/channels.list?token=FAKE')
                    .reply(200, resp);

      slack.channelsList(function(err, result, rawResponse) {
        assertResults(scope, done, err, result, rawResponse);
      });
    })

    it('channelsHistory', function(done) {
      var resp  = FakeResponses.ChannelsHistory;
      var qs    = { channel: 'C302325' };

      var scope = nock('https://slack.com')
                    .get('/api/channels.history?token=FAKE&channel=C302325')
                    .reply(200, resp);

      slack.channelsHistory(qs, function(err, result, rawResponse) {
        assertResults(scope, done, err, result, rawResponse);
      });
    })

  })

})