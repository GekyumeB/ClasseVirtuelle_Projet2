
function formatMessage(userId, role, username, avatarUrl, text, time) {
  return {
    userId,
    role,
    username,
    avatarUrl,
    text,
    time
  };
}

module.exports = formatMessage;