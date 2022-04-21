
function formatMessage(userId, username, avatarUrl, text, time) {
  return {
    userId,
    username,
    avatarUrl,
    text,
    time
  };
}

module.exports = formatMessage;