const User = require("../models/User")
let nodemailer = require('nodemailer')

UserController = {}

UserController.logIn = async (req, res) => {
    try {
        console.log(req.body)
        let username = req.body.username
        let password = req.body.password

        console.log(username)

        let user = await User.findOne({
            where: {
                username: username,
                password: password
            }
        })
       
        let message = ''

        if (user) {
           message = 'login success'
        }
        else {
            message = 'wrong password / no user'
        }

        res.json({ message, user })

    } catch (error) {
        console.log(error)
        res.json(error);
    }
}

UserController.approve = async (req, res) => {
    try {
        let id = req.body.id
        console.log(id)
        let user = await User.findByPk(id)
        user.approve = 1
        await user.save()

        let check = await checkApprove()
        console.log(check)

        if (check == true) {
            sendMail()
        }
        let massage = 'approved'
        res.json(massage)

    } catch (error) {
        console.log(error)

    }
}

UserController.get = async (req, res) => {
    try {
        let users = await User.findAll()
        console.log(users.length)
        res.json(users)

    } catch (error) {
        res.json(error)

    }
}

async function sendMail() {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL,
            pass: process.env.PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.GMAIL,
        to: process.env.DEST_EMAIL,
        subject: 'Approved!',
        text: 'This worksheet has been approved by 3 users already.'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

async function checkApprove() {
    let users = await User.findAll({
        where: {
            approve: 1
        }
    })
    console.log(users.length)
    if (users.length == 3) {
        return true
    }
    else {
        return false
    }
    
}

module.exports = UserController