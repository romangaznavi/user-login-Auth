const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/login',{ useNewUrlParser: true })
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.log("Not Connected to MongoDB...", err));

module.exports = mongoose