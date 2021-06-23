const mongoose = require('mongoose');

const connection = {};


async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  connection.isConnected = db.connections[0].readyState;
  // console.log(connection.isConnected);

  if (db.connections[0].readyState === 1) {
    console.log('MongoDB connected...')
  }

};


module.exports = dbConnect;