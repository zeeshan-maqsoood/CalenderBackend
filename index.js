const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const LoginRouter = require('./Routes/LoginRouter');
const Database = require('./Database/db');
const SignupModel = require('./Schema/SignupSchema');
const EventsModal = require('./Schema/EventsSchema');
const EventRouter = require('./Routes/EventsRoutes');

// get the reference of EventEmitter class of events module
var events = require('events');

//create an object of EventEmitter class by using above reference
var em = new events.EventEmitter();

//Subscribe for FirstEvent
em.on('FirstEvent', async function (data) {
  const adminData = await SignupModel.findOne({ role: 'admin' });

  if (adminData === null) {
    const adminUser = await SignupModel({
      UserName: 'calenderapp',
      email: 'admin@calenderapp.com',
      password: 'Admin@123',
      role: 'admin',
    });
    await adminUser.save();
  } else if (adminData.length === 1) {
    eventEmitter.removeAllListeners('FirstEvent');
  }
});

// Raising FirstEvent
em.emit('FirstEvent', 'This is my first Node.js event emitter example.');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', LoginRouter);
app.use(cookieParser());
app.use('/', EventRouter);
app.listen(5000, () => {
  console.log('Server is running at 5000');
});
