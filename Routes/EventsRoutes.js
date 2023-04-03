const express = require('express');
const router = express.Router();
const EventsController = require('../Controllers/EventsController');
router.post('/', EventsController.AddEventFunction);
router.get('/', EventsController.getEventsApi);
router.get('/:id', EventsController.getLoginUser);
router.put('/', EventsController.EditEventFunction);
router.delete('/:id', EventsController.DeleteEventFunction);
module.exports = router;
