const User = require('../models/user');
const { registerMail } = require('../utils/mailTemlate');
const { sendMail } = require('../utils/sendMail');

exports.createUser = async (req, res) => {
    console.log("here", req.body)
    try {
        const { firstName, lastName, dob, phoneNumber, email } = req.body;
        let user = await User.create({ firstName, lastName, dob, phoneNumber, email });
        return res.status(201).send({
            success: true,
            user
        }
        );
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Error while creating user",
            error
        })
    }
};

exports.createUserAddress = async (req, res) => {
    // console.log("here", req.body)
    try {
        const { email, address } = req.body
        let user = await User.findOneAndUpdate({ email }, {
            $addToSet: {
                address: { $each: address }
            }
        }, { new: true });
        let response = {};
        if (user) {
            response.success = true;
            response.status = 200;
            response.message = `Address to user:${email} added successfully`;
            let registerTemplate = registerMail(user);
            await sendMail(email, "User Registeration Completed", registerTemplate);

        } else {
            response.success = false;
            response.status = 400;
            response.message = `User not found`;
        }
        return res.status(response.status).send(response);
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Error while creating user",
            error
        })
    }
}

exports.checkUserExists = async (req, res) => {
    const { phoneNumber, email } = req.query;
    const userExists = await User.findOne(
        {
            $or: [
                { phoneNumber }, { email }
            ]
        }
    )
    if (!userExists) {
        return res.send({ success: true, emailUsed: false, phoneNumberUsed: false })
    };
    let emailUsed = false;
    let phoneNumberUsed = false;

    if (userExists.email == email) emailUsed = true;
    if (userExists.phoneNumber == phoneNumber) phoneNumberUsed = true;
    return res.send({ success: true, emailUsed, phoneNumberUsed })

}