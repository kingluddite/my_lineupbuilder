# my_lineupbuilder
Quick way to create soccer lineups for a coach to email his team

## Our Number System
There are many variations of a number system used today. Here is the
one we will use for this site:
/* 1 - goalkeeper
2 - right wing-back
3 - left wing-back
4 - central defender 
5 - central defender (and most important defender) 
6 - defensive midfielder 
7 - left winger
8 - right winger
9 - forward
10 - playmaker/offensive midfielder
11 - forward


-------1-------
2---4----5----3
-------6-------
8-------------7
------10-------
----9----11---- 

*/

TODO
For Team give option to create leagues (crud)
Inside the League give the option to create seasons (crud)
Inside games the league should populate with the leagues for this team
Based on the league chosen, the season should populate with seasons from that league

Add these fields for players
-feePaid (number)

Add these fields for game
-pregameMessage
if gameStatus is 'Final', show these text fields in game:
-postGameMessage
-homeTeamScore
-awayTeamScore
-goalScorers (dropdown with only starters and subs for that game)
* just push in the players into this array, can have duplicates, add them up for the game totals
-gameStatus: "To Be Played", "Final", "Cancelled" (and values 'TBP', 'FINAL', and 'CANCELLED' entered into db)
-result: 3, 1, 0 (win, loss, draw) should be number
(dropdown win, loss, draw and 3,0,1 values entered into db)
-forfeit: true or false

add goalie so he can be dragged and dropped like the rest of the players

weather api should connect to game and on game day should weather

season should have season fee field
season fee
  * go into each game and find the fees paid by all players and add them up and subtract them from the season fee

  starting lineup
  drag players off starting lineup and they are removed from field and their code is put back the way it was
  
  not allowed to drag existing starters onto starting lineup
  on

  when you got to starters page
  existing player on lineup show up with their names

  add sessions for formation created and positions created (start instructions not necessary when both are created)

  make adding positions more user friendly, boxes grown and animate when you click on them and shrink and animate when you blur on 

  be able to remove subs
  be able to remove not playing

  get not playing drag drop to work
  populate game show page of players not playing

  populate game show page of sub players

  create publish page


todo
FIXED - when log in as new user should ask you to create a team
fix make entering calendar output a date value
fix make formation radio buttons fill with correct formation
put headings and instructions on positions and formations
and subs and not playing
get not playing and subs drag drop to work
get starting lineup drag drop to work and populate starting positions and names
link from starting lineup back to game info when submit starting lineup
drag players to trash to remove them
no duplicate starters allowed
when click on position they all are updated
postions should be created before starting lineup
create subs
create not playing
show final page with all the content nicely formatted
edit or publish buttons
create video to show how it works
deploy to meteor.com

fix - no dupes on starting lineup
drag drop goalie
cursor on mouse over
