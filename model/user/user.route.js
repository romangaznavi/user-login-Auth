const express = require("express");
const router = express.Router();
const userModel = require('./user.model');

router.post('/register', userModel.register);
router.post('/login', userModel.login);

router.get('/', (req, res, next) => {
    res.json({ message: "Default router called!" });
})


module.exports = router;