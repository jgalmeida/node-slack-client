var Requester = require('../requester');

module.exports = {
  usersList: UsersList
}

function UsersList(requester) {
  var action      = 'users.list';
  var responseKey = 'members';

  return requester.perform(action, responseKey);
}