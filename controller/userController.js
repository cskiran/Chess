const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// registration controller
exports.register = async (req, res) => {
    try{
    const emailExist = await User.findOne({ email: req.body.email });
    console.log(emailExist);
    if (emailExist) {
        res.status(404).send('Email already exist');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass
    });
    try {
        const saveUser = await user.save();
        res.send(saveUser);
    } catch (error) {
        res.status(404).send(error);
    }
}catch(error){
    console.log(error);
}
};

// login controller
exports.login = async (req, res) => {

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email or pass is wrong');

    //validate pass
    const validatePass = await bcrypt.compare(req.body.password, user.password);
    if (!validatePass) return res.status(400).send('invalid pass');

    // create and assign token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('Access-Control-Expose-Headers','auth-token')
    res.header('auth-token',token).send('logged in');
}