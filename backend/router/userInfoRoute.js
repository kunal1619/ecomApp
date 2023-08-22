const express = require('express');
const router = express.Router();
const {userCreateProfile,fetchUserProfile, userAddresess, fetchUserAddresses, editAddress} = require('../controller/userInfo')

router.post('/user_profile', userCreateProfile)
router.get('/user/:userid', fetchUserProfile)
router.post('/addresses', userAddresess)
router.get('/all_addresses/:userid', fetchUserAddresses)
router.put('/edit_address', editAddress)

module.exports = router;
