const UserInfoSchema = require('../model/UserInfo');
const {Addresses} = require('../model/Addresses')


const userCreateProfile = async (req, res) => {
  const userData = req.body;

  try {
      const userId = userData.userId; // Assuming userId is the unique identifier for users
      
      // Check if the user already exists in the database
      let userInfo = await UserInfoSchema.findOne({ userId });

      if (!userInfo) {
          // User doesn't exist, create a new entry
          userInfo = new UserInfoSchema(userData);
      } else {
          // User exists, update the existing entry
          userInfo.set(userData);
      }

      const savedUserInfo = await userInfo.save();
      
      res.status(201).json(savedUserInfo);
  } catch (err) {
      console.error('Error while creating or updating user profile:', err);
      res.status(400).json({ error: 'Failed to create or update user profile' });
  }
};

const fetchUserProfile = async(req, res)=>{
  const userid = req.params.userid;

  try{
    const document = await UserInfoSchema.findOne({userId : userid});
    if(!document){
      return res.status(404).json({error : "User not found"})
    }

    res.status(201).json(document)
  }catch(error){
    console.log('error while fetching userprofile', error);
    res.status(500).json({error : 'Error while fetching user'})
  }
}


const userAddresess = async (req, res) => {
  const userId = req.body.userId;
  const { name, email, streetAddress, state, pin } = req.body.address;

  try {
    // Find the user by userId using the Addresses model
    const user = await Addresses.findOne({ userId: userId });

    if (!user) {
      // If the user doesn't exist, create a new user with the address
      const newUser = new Addresses({
        userId: userId,
        addresses: [{
            name: name,
            email: email,
            address: streetAddress,
            country: state,
            pin: pin
          }],
      });

      // Save the new user document
      await newUser.save();

      return res.status(201).json(newUser.addresses);
    }

    // Add the new address to the existing user's addresses array
    user.addresses.push({
      name: name,
      email: email,
      address: streetAddress,
      country: state,
      pin: pin
    });

    // Save the updated user document
    await user.save();

    return res.status(201).json(user.addresses);

  } catch (err) {
    res.status(400).json({ err: "Error while updating user information" });
    console.log('Error while updating user information', err);
  }
}

const fetchUserAddresses = async (req, res) => {
  const userId = req.params.userid; // Make sure to use consistent variable naming


  try {
    const user = await Addresses.findOne({ userId: userId }); // Use findOne to get a single document

    if (user) {
      return res.status(200).json(user.addresses); // Status code should be 200 for successful retrieval
    } else {
      return res.status(404).json('User not found'); // Status code should be 404 if user is not found
    }
  } catch (error) {
    res.status(400).json({ error: 'Error while fetching addresses from database' }); // Provide a proper error response
    console.log('Error while fetching addresses from database', error);
  }
}

const mongoose = require('mongoose');

const editAddress = async (req, res) => {
  const userId = req.body.userId;
  const updatedAddress = req.body.address;

  try {
    const existingDocument = await Addresses.findOne({ userId });

    if (!existingDocument) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const addressId = mongoose.Types.ObjectId(updatedAddress._id);

    const addressIndex = existingDocument.addresses.findIndex(
      (address) => address._id.equals(addressId)
    );

    if (addressIndex === -1) {
      return res.status(404).json({ error: 'Address not found' });
    }

    existingDocument.addresses[addressIndex] = updatedAddress;

    await existingDocument.save();

    return res.status(200).json(existingDocument);
  } catch (error) {
    console.log('Error updating address', error);
    res.status(500).json({ error: 'Error while updating address' });
  }
};



module.exports = {userCreateProfile, fetchUserProfile, userAddresess, fetchUserAddresses, editAddress}