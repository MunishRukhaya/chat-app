const bcrypt = require('bcrypt');
const User = require('../models/userModel');

module.exports = async (req, res) => {
    const existingUser = await User.findOne({ username: req.body.username });
    if (!existingUser) {
        const hash = bcrypt.hashSync(req.body.password, 10);
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: hash
        }).then((response) => {
            res.status(200).send({ message: `User with ID:${req.body.username} has been created` });
        });
    } else {
        res.status(401).send({ message: "username already exists" });
    }
}
