// /*
//   Export
//   Method for handling data export from our app.
//  */

// /*
//   Import our NPM packages using the meteorhacks:npm package (thanks, Arunoda!).
//   See: https://atmospherejs.com/meteorhacks/npm.
//   The final require, 'fs', is using the core Npm.require method to pull in the
//   file system from Node.js core. We're doing this because fs is not an npm
//   package that we need to load. It's already available via Meteor, we just need
//   to tell Meteor to give us access to it here.
//  */
// var fastCsv, jsZip, xmlBuilder;

// jsZip = Meteor.npmRequire('jszip');

// xmlBuilder = Meteor.npmRequire('xmlbuilder');

// fastCsv = Meteor.npmRequire('fast-csv');

// Meteor.methods({
//   exportData: function(userId) {
//     var assetsFolder, exportFriendsAsCsv, exportProfileAsHtml, exportProfileAsJSON, exportProfileAsXml, getComments, getFriends, getPosts, getUser, zip;
//     check(userId, String);
//     zip = new jsZip();
//     assetsFolder = zip.folder('assets');
//     getUser = Meteor.users.findOne({
//       "_id": userId
//     }, {
//       fields: {
//         "profile.name": 1,
//         "profile.photo": 1,
//         "profile.biography": 1,
//         "profile.location": 1,
//         "profile.career": 1
//       }
//     });
//     getFriends = Friends.find({
//       "owner": userId
//     }, {
//       fields: {
//         "_id": 1,
//         "photo": 1,
//         "name": 1
//       }
//     }).fetch();
//     getComments = Comments.find({
//       "owner": userId
//     }, {
//       fields: {
//         "_id": 1,
//         "avatar": 1,
//         "commenterName": 1,
//         "commentDate": 1,
//         "commentContent": 1
//       }
//     }).fetch();
//     getPosts = Posts.find({
//       "owner": userId
//     }, {
//       fields: {
//         "_id": 1,
//         "text": 1,
//         "name": 1,
//         "date": 1
//       }
//     }).fetch();
//     exportFriendsAsCsv = function() {

//       /*
//         Export friends as a .csv file.
//        */
//       var csv;
//       csv = fastCsv;
//       return csv.writeToString(getFriends, {
//         headers: true
//       }, function(error, data) {
//         if (error) {
//           return console.log(error);
//         } else {
//           return zip.file('friends.csv', data);
//         }
//       });
//     };
//     exportProfileAsXml = function() {

//       /*
//         Export full profile (friends, comments, and posts) as a .xml file.
//        */
//       var comment, commentData, commentsData, friend, friendData, friendsData, i, j, k, len, len1, len2, post, postData, postsData, profile, profileXmlString, userData;
//       profile = xmlBuilder.create('profile');
//       userData = profile.ele('user');
//       userData.ele('name', getUser.profile.name);
//       userData.ele('photo', getUser.profile.photo);
//       userData.ele('biography', getUser.profile.biography);
//       userData.ele('location', getUser.profile.location);
//       userData.ele('career', getUser.profile.career);
//       friendsData = profile.ele('friends');
//       for (i = 0, len = getFriends.length; i < len; i++) {
//         friend = getFriends[i];
//         friendData = friendsData.ele('friend');
//         friendData.ele('name', friend.name);
//         friendData.ele('photo', friend.photo);
//       }
//       commentsData = profile.ele('comments');
//       for (j = 0, len1 = getComments.length; j < len1; j++) {
//         comment = getComments[j];
//         commentData = commentsData.ele('comment');
//         commentData.ele('name', comment.commenterName);
//         commentData.ele('avatar', comment.avatar);
//         commentData.ele('date', comment.commentDate);
//         commentData.ele('content', comment.commentContent);
//       }
//       postsData = profile.ele('posts');
//       for (k = 0, len2 = getPosts.length; k < len2; k++) {
//         post = getPosts[k];
//         postData = postsData.ele('post');
//         postData.ele('name', post.name);
//         postData.ele('date', post.date);
//         postData.ele('text', post.text);
//       }
//       profileXmlString = profile.end({
//         pretty: true
//       });
//       return zip.file('profile.xml', profileXmlString);
//     };
//     exportProfileAsHtml = function() {
//       var comment, commentsContent, container, exportCss, exportJs, footer, friend, friendsList, head, header, htmlExportString, i, j, k, len, len1, len2, post, postsContent, profileBody, profileSidebar, scripts;
//       exportCss = Assets.getText("export/style.css");
//       exportJs = Assets.getText("export/bootstrap.js");
//       assetsFolder.file('style.css', exportCss);
//       assetsFolder.file('bootstrap.js', exportJs);
//       head = "<head> <title>Blerg | Data Export</title> <meta charset='utf-8'> <meta name='viewport' content='width=device-width, initial-scale=1'> <link rel='stylesheet' type='text/css' href='assets/style.css'> </head>";
//       scripts = "<script src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'></script> <script src='assets/bootstrap.js'></script>";
//       header = "<html>" + head + "<body>";
//       footer = scripts + "</body></html>";
//       friendsList = "<ul>";
//       for (i = 0, len = getFriends.length; i < len; i++) {
//         friend = getFriends[i];
//         friendsList += "<li><img src='" + friend.photo + "' class='img-responsive' alt='" + friend.name + "'></li>";
//       }
//       friendsList += "</ul>";
//       profileSidebar = "<img src='" + getUser.profile.photo + "' class='profile-photo img-responsive img-rounded' alt='" + getUser.profile.photo + "' /> <div class='panel panel-default user-information'> <div class='panel-heading'>About " + getUser.profile.name + "</div> <div class='panel-body'> <div class='panel-block'> <strong>Friends</strong> " + friendsList + " </div> <div class='panel-block'> <strong>Location</strong> <p>" + getUser.profile.location + "</p> </div> <div class='panel-block'> <strong>Career</strong> <p>" + getUser.profile.career + "</p> </div> </div> </div>";
//       postsContent = "";
//       for (j = 0, len1 = getPosts.length; j < len1; j++) {
//         post = getPosts[j];
//         postsContent += "<div class='panel panel-default'> <div class='panel-body'> " + post.text + " </div> <div class='panel-footer'>By <strong>" + post.name + "</strong> on " + post.date + "</div> </div>";
//       }
//       commentsContent = "";
//       for (k = 0, len2 = getComments.length; k < len2; k++) {
//         comment = getComments[k];
//         commentsContent += "<div class='panel panel-default'> <div class='panel-body'> <img class='comment-avatar' src='" + comment.avatar + "' alt='" + comment.commenterName + "'> <div class='comment-content'> " + comment.commentContent + " </div> </div> <div class='panel-footer'>By <strong>" + comment.commenterName + "</strong> on " + comment.commentDate + "</div> </div>";
//       }
//       profileBody = "<h2>" + getUser.profile.name + "</h2> <p>" + getUser.profile.biography + "</p> <ul class='nav nav-tabs' role='tablist'> <li class='active'><a href='#posts' role='tab' data-toggle='tab'>Posts</a></li> <li><a href='#comments' role='tab' data-toggle='tab'>Comments</a></li> </ul> <div class='tab-content'> <div class='tab-pane active posts' id='posts'> " + postsContent + " </div> <div class='tab-pane comments' id='comments'> " + commentsContent + " </div> </div>";
//       container = "<div class='container'> <div class='row'> <div class='col-xs-12 col-sm-4'> " + profileSidebar + " </div> <div class='col-xs-12 col-sm-8'> " + profileBody + " </div> </div> </div>";
//       htmlExportString = header + container + footer;
//       return zip.file('index.html', htmlExportString);
//     };
//     exportProfileAsJSON = function() {
//       var comment, friend, i, j, k, len, len1, len2, post, profile;
//       profile = {
//         user: {},
//         friends: [],
//         comments: [],
//         posts: []
//       };
//       profile.user = {
//         name: getUser.profile.name,
//         photo: getUser.profile.photo,
//         biography: getUser.profile.biography,
//         location: getUser.profile.location,
//         career: getUser.profile.career
//       };
//       for (i = 0, len = getFriends.length; i < len; i++) {
//         friend = getFriends[i];
//         profile.friends.push(friend);
//       }
//       for (j = 0, len1 = getComments.length; j < len1; j++) {
//         comment = getComments[j];
//         profile.comments.push(comment);
//       }
//       for (k = 0, len2 = getPosts.length; k < len2; k++) {
//         post = getPosts[k];
//         profile.posts.push(post);
//       }
//       profile = JSON.stringify(profile);
//       return zip.file('tester.json', profile);
//     };
//     exportFriendsAsCsv();
//     exportProfileAsXml();
//     exportProfileAsHtml();
//     exportProfileAsJSON();
//     return zip.generate({
//       type: "base64"
//     });
//   }
// });
