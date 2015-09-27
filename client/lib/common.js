checkPlayer = function(gameStatus, reminderStatus, listType) {
  if (reminderStatus == 'no') {
    return 'Not Playing';
  } else {
    if (gameStatus == listType) {
      return 'Already Added';
    } else {
      return 'Player Added';
    }
  }
};
