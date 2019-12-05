const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlSong = require('../controllers/song.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/oauth/google', ctrlUser.authenticate_google);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/:varify', ctrlUser.varify);
router.post('/authenticate', ctrlUser.authenticate);


//save a song and return id
router.put('/secure/song', ctrlSong.savesong);

module.exports = router;