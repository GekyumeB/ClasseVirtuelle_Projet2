const moment = require('moment');

function formatMessage(username, avatarUrl, text) {
  return {
    username,
    avatarUrl,
    text,
    time: moment().format('h:mm a')
  };
}

module.exports = formatMessage;