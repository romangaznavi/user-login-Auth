const userRoute = require('./model/user/user.route');

module.exports = (app) => {
    app.use("/api/user", userRoute);

    app.use('/', (req, res, next) => {
        res.json({ message: "Default route is called"});
    })
}
