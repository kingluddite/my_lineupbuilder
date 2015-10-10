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

objectLength = function(obj) {
  var result = 0;
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      // or Object.prototype.hasOwnProperty.call(obj, prop)
      result++;
    }
  }
  return result;
}
