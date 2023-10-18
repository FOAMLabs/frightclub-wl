const mongoose = require('mongoose');

// Replace the URL with your MongoDB connection string
const DB_URL = process.env.MONGODB_URI;

const ObjectId = mongoose.Schema.Types.ObjectId;
const Timestamp = mongoose.Schema.Types.Timestamp;

const userDataSchema = new mongoose.Schema({
  _id: {
    type: ObjectId, 
    auto: true
  },
  userId: {
    type: Timestamp, 
    default: Date.now 
  },
  address: {
    type: String, 
    required: true
  },
  ipAddress: String
});

const UserData = mongoose.model('UserData', userDataSchema);

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Error connecting to MongoDB', err);
});