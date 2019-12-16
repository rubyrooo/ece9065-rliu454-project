const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlSong = require('../controllers/song.controller');
const ctrlReview = require('../controllers/review.controller');
const ctrlPlaylist = require('../controllers/playlist.controller');
const ctrlAdmin = require('../controllers/admin.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/googleregister', ctrlUser.googleregister);
router.post('/oauth/google', ctrlUser.authenticate_google);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/:varify', ctrlUser.varify);
router.post('/authenticate', ctrlUser.authenticate);


//create a song and return title
router.post('/secure/song', ctrlSong.savesong);


//create a review by
router.post('/secure/reviews', ctrlReview.savereview);
//get all review by given song name
router.get('/secure/reviews/:id', ctrlReview.showreview);


//create a review by given song name
router.post('/secure/playlist', ctrlPlaylist.saveplaylist);
//add a song to playlist by given playlistN,userN,songN
router.post('/secure/savesongplaylist', ctrlPlaylist.savesongtoplaylist);
//add a playlist by given playlistN,userN,createrN
router.post('/secure/addasmyplaylist', ctrlPlaylist.addasmyplaylist);

//get all playlist by userid
router.get('/secure/playlist/:id', ctrlPlaylist.showplaylist);
//soft search playlist
router.get('/secure/search/playlist/:id', ctrlPlaylist.searchplaylist);
//get all song in playlist by given playlistN_userN  NOT USSED!!
router.get('/secure/search/playlistsong/:id', ctrlPlaylist.showsonginlist);

//delete song in a playlist by given playlistN,userN,songN
router.post('/secure/deletesongplaylist', ctrlPlaylist.deletesongtoplaylist);

//soft search song
router.get('/open/search/:id', ctrlSong.searchsong);

//top 10 song
router.get('/open/song', ctrlSong.topsong);
//get song by name
router.get('/open/song/:id', ctrlSong.showsong);


//update description in a user playlist by given playlistN,userN, description
router.post('/secure/playlist/description/update', ctrlPlaylist.updateplaylistDes);
//update status in a user playlist by given playlistN,userN, description
router.post('/secure/playlist/status/update', ctrlPlaylist.updateplaylistStatus);


//update admin status in users by gvien {email, admin}
router.post('/admin/userstatus/update', ctrlAdmin.grantUser);
//update hidden status in songs by given {title, hidden}
router.post('/admin/songstatus/update', ctrlAdmin.grantSong);
//update active status in users by gvien {email, active}
router.post('/admin/useractive/update', ctrlAdmin.activeUser);
//get all song 
router.get('/admin/songs', ctrlAdmin.getallSong);
//get all user 
router.get('/admin/users', ctrlAdmin.getallUser);

module.exports = router;