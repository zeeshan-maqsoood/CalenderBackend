const EventsSchema = require('../Schema/EventsSchema');
const AddEventFunction = async (req, res) => {
  
  const { title, description, startsAt, endsAt, type, date } = req.body.values;
  try {
    const eventData = await EventsSchema({
      title: title,
      description: description,
      date: date,
      startsAt: startsAt,
      endsAt: endsAt,
      typeOf: type,
      userID: '',
    });
    await eventData.save();

    const PublicEvents = await EventsSchema.find({ typeOf: 'Public' });
    const PrivateEvents = await EventsSchema.find({ typeOf: 'Private' });
    res
      .status(200)
      .json({ PublicEvents: PublicEvents, PrivateEvents: PrivateEvents });
  } catch (error) {
    res.status(404).json(error);
  }
};
const getEventsApi = async (req, res) => {
  try {
    const PublicEvents = await EventsSchema.find({ typeOf: 'Public' });
    const PrivateEvents = await EventsSchema.find({ typeOf: 'Private' });
    res
      .status(200)
      .json({ PublicEvents: PublicEvents, PrivateEvents: PrivateEvents });
  } catch (error) {
    res.status(404).json('not send');
  }
};

const EditEventFunction = async (req, res) => {
  
  const { _id, title, description, date, startsAt, endsAt, typeOf, userID } =
    req.body.values;
  try {
    const editData = await EventsSchema.findByIdAndUpdate(
      { _id: _id },
      {
        title: title,
        description: description,
        date: date,
        startsAt: startsAt,
        endsAt: endsAt,
        typeOf: typeOf,
        userID: userID,
      }
    );
    if (editData) {
      const PrivateEvents = await EventsSchema.find({ typeOf: 'Private' });
      const PublicEvents = await EventsSchema.find({ typeOf: 'Public' });
      res
        .status(200)
        .json({ PublicEvents: PublicEvents, PrivateEvents: PrivateEvents });
    }
   
  } catch (error) {
    res.status(404).json('not send');
  }
};

const DeleteEventFunction = async (req, res) => {
  try {
    const deleteEvent = await EventsSchema.findByIdAndDelete({
      _id: req.params.id,
    });
    const PrivateEvents = await EventsSchema.find({ typeOf: 'Private' });
    const PublicEvents = await EventsSchema.find({ typeOf: 'Public' });
    res
      .status(200)
      .json({ PrivateEvents: PrivateEvents, PublicEvents: PublicEvents });
  } catch (error) {
    res.status(404).json('fl');
  }
};

module.exports = {
  AddEventFunction,
  getEventsApi,
  EditEventFunction,
  DeleteEventFunction,
};
