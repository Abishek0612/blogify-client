const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const bcrypt = require('bcryptjs')


//@desc Register a new user
//@route POST /api/users/register
//@access public
exports.register = asyncHandler(async (req, res) => {

    //get the details
    const { username, email, password } = req.body;
    //!check if user exists
    const user = await User.findOne({ username })
    if (user) {
        throw new Error('User Already Exists')
    }
    //Register a new user
    const newUser = new User({
        username,
        email,
        password,
    });
    //! hash password
    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(password, salt)
    //save
    await newUser.save()
    res.status(201).json({
        status: 'success',
        message: 'User Registered Successfully',
        _id: newUser?._id,
        username: newUser?.username,
        email: newUser?.email,
    })
}
)