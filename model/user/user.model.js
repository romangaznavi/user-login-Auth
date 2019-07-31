const User = require('./user.schema');
const passport = require("passport");


module.exports.register = (req, res, next) => {

    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    // console.log(userData);
    
    User.create(userData)
    .then(result => {
        return res.status(200).json(result)
    })
    .catch(error => res.status(500).json(error));
}


module.exports.login = (req, res, next) => {
    console.log("Inside login route", req.body)
    passport.authenticate('local', function(err, user, info) {
        if(err) {
            res.status(500).send(err);
        }
        
        if(user) {
            let data = {
                accessToken: user.generateJwt()
            }
            return res.status(200).json(data)
        } else {
            return res.status(400).json(info)
        }
    }) (req, res)
}