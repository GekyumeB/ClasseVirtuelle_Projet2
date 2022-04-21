const moment = require('moment');

function formatMessage(userId, username, avatarUrl, text) {
  return {
    userId,
    username,
    avatarUrl,
    text,
    time: moment().format('h:mm a')
  };
}

module.exports = formatMessage;