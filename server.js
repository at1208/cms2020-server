const bodyParser = require('body-parser');
const GoogleStrategy = require("passport-google-oauth2");
const morgan = require('morgan');
const app = require('express')();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const server = require('http').createServer(app);
const passport = require("passport");

require('dotenv').config();
require("./sockets/groupchat")(server);
require("./sockets/privatechat")(server);




const projectRoute = require('./routes/project_route');
const departmentRoute = require('./routes/department_route');
const designationRoute = require('./routes/designation_route');
const authRoute = require('./routes/auth_route');
const memberRoute = require('./routes/member_route');
const groupRoute = require('./routes/group_route');


app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());


app.use('/api', projectRoute);
app.use('/api', departmentRoute);
app.use('/api', designationRoute);
app.use('/api', authRoute);
app.use('/api', memberRoute);
app.use('/api', groupRoute);



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  }, (accessToken, refreshToken, profile, done) => {
     
  })
);

app.get('/auth/google', passport.authenticate("google", {
  scope: ["profile", "email"]
}))

app.get('/auth/google/callback', passport.authenticate("google"))

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to DB'))
    .catch(err => {
        console.log(err);
    });

const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
