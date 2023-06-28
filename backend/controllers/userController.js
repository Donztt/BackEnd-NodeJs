const User = require('../models/User');
const axios = require('axios');
const createMessageChannel = require('../messages/messageChannel');
require('dotenv').config();

const createUser = async (req, res) => {
  try {
    const { email, first_name, last_name, avatar } = req.body;

    const newUser = new User({
      email,
      first_name,
      last_name,
      avatar,
    });

    const savedUser = await newUser.save();
    const messageChannel = await createMessageChannel(
      'User:' + savedUser.first_name + ' successfull created'
    );

    if (messageChannel != null) {
      res.status(201).json(savedUser);
    }
  } catch (error) {
    res.status(500).json({ error: 'Create user error -- ' + error });
    console.log(error);
  }
};

const getUserReqRes = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get('https://reqres.in/api/users/' + id);
    res.json(response.data);
  } catch (error) {
    console.error(error);
  }
};

const getUserReqResAvatar = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    const url = user.avatar;

    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');
    const base64Image = imageBuffer.toString('base64');

    res.json({ base64: base64Image });
  } catch (error) {
    console.error(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const getAll = await User.find();
    res.json(getAll);
  } catch (error) {
    res.status(500).json({ error: 'Error on find users -- ' + error });
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cpf } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, cpf },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error on update user' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error on delete user' });
  }
};

module.exports = {
  createUser,
  getUserReqRes,
  getUserReqResAvatar,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
