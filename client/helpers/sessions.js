// get id of player when you click on them
Session.setDefaultPersistent("sPlayerId", null);
// keep track of where you are - is the roster completed
Session.setDefaultPersistent("sGameId", null);
Session.setDefaultPersistent("sTeamId", null);
// sessions to keep track of what stuff was completed
// we will hide/change UI depending on their state
Session.setDefaultPersistent("sTeamCreated", false);
Session.setDefaultPersistent("sGameCreated", false);
Session.setDefaultPersistent("sRosterComplete", false);
Session.setDefaultPersistent("sFormationCreated", false);
Session.setDefaultPersistent("sFormationChosen", false);
Session.setDefaultPersistent("sPositionsSet", false);
Session.setDefaultPersistent("sStartersChosen", false);
Session.setDefaultPersistent("sSubsChosen", false);
Session.setDefaultPersistent("sNotPlayingChosen", false);
