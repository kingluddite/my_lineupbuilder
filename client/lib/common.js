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

// values of unchecked boxes do not get posted
// to get a true or false value entered into db
// we create the myFormationChoice variable
// and populate it with true or false if checked or unchecked
// then call this function when updating game db
// and true is entered for myFormation if checked
// and false is entered for myFormation if not checked
function isHomeChecked() {
  var myFormationChoice;

  if ($('.home-team-chkbox').prop('checked')) {
    myFormationChoice = true;
  } else {
    myFormationChoice = false;
  }
  return myFormationChoice;
}
