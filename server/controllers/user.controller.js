const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const User = mongoose.model('User');


module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.method = req.body.method;
    user.active = 'notverified';

    //send emaul
    var options = {
        auth: {
            api_user: 'rubyroo',
            api_key: '123qweasd'
        }
    }
    var client = nodemailer.createTransport(sgTransport(options));

    user.save((err, doc) => {
        if (!err) {

            // Create e-mail object to send to user
            var emailemail = {
                from: 'Localhost Staff, staff@localhost.com',
                to: user.email,
                subject: 'Localhost Activation Link',
                text: 'Hello<strong> ' + user.fullName + '</strong>,<br><br>Thank you for registering at localhost.com. Please click on the link below to complete your activation:<br><br><a href="http://localhost:3000/api/' + req.body.email + '"> Click Me</a>',
                html: 'Hello<strong> ' + user.fullName + '</strong>,<br><br>Thank you for registering at localhost.com. Please click on the link below to complete your activation:<br><br><a href="http://localhost:3000/api/' + req.body.email + '"> Click Me</a>'

            };
            // Function to send e-mail to the user
            client.sendMail(emailemail, function(err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('message sent:' + info.response);
                } // If error with sending e-mail, log to console/terminal


            });

            res.send(doc);

        } else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

//Google Register
module.exports.googleregister = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.method = 'google';
    user.active = true;
    user.save((err, doc) => {
        if (!err) {
            res.send(doc);

        } else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']); // ------
            else
                return next(err);
        }

    });
}


// Change active to 'activated' once email has been varified
module.exports.verify = (req, res) => {
    User.findOneAndUpdate({ email: req.params.verify }, { $set: { active: 'activated' } }).then((updatedDoc) => {
        res.send(
            '<html><strong> Email Verify Secceed.</strong><br><br><a href="http://localhost:4200/login">click</a></html>'
        );
    })
};



module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}


module.exports.authenticate_google = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('googleToken', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user: _.pick(user, ['fullName', 'email', 'admin']) });
        }
    );
}





module.exports.resend = (req, res, next) => {
    //send email
    var options = {
        auth: {
            api_user: 'rubyroo',
            api_key: '123qweasd'
        }
    }
    var client = nodemailer.createTransport(sgTransport(options));

    var emailemail = {
        from: 'Localhost Staff, staff@localhost.com',
        to: req.body.email,
        subject: 'Localhost Activation Link',
        text: 'Hello<strong> ' + req.body.email + '</strong>,<br><br>Thank you for registering at localhost.com. Please click on the link below to complete your activation:<br><br><a href="http://localhost:3000/api/' + req.body.email + '"> Click Me</a>',
        html: 'Hello<strong> ' + req.body.email + '</strong>,<br><br>Thank you for registering at localhost.com. Please click on the link below to complete your activation:<br><br><a href="http://localhost:3000/api/' + req.body.email + '"> Click Me</a>'

    };
    // Function to send e-mail to the user
    client.sendMail(emailemail, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('message sent:' + info.response);
        } // If error with sending e-mail, log to console/terminal


    });

    res.send(doc);

}