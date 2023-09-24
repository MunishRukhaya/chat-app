const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
        const pass = bcrypt.compareSync(req.body.password, existingUser.password);
        if(pass) {
            const uid = existingUser._id;
            const token = jwt.sign({uid:uid}, process.env.JWT_KEY)
            res.status(200).cookie('login', token).cookie('username',existingUser.username).send({ message: `User with username:${existingUser.username} has been logged in`,username:`${existingUser.username}` });
        } else {
            res.status(401).send({ message:'Invalid password'});
        }
    } else {
        res.status(401).send({ message:'User does not exist'});
    }
}

