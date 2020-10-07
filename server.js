const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = require('express')();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
require('./controllers/groupchat_controller')(io)


const projectRoute = require('./routes/project_route');
const departmentRoute = require('./routes/department_route');
const designationRoute = require('./routes/designation_route');
const authRoute = require('./routes/auth_route');
const memberRoute = require('./routes/member_route');

app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());


app.use('/api', projectRoute);
app.use('/api', departmentRoute);
app.use('/api', designationRoute);
app.use('/api', authRoute);
app.use('/api', memberRoute);

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
