const mongoose = require("mongoose");
//Connection of mongoose

async function connectMongoDb(url) {
  return mongoose.connect(url);
}

module.exports = {
  connectMongoDb,
};
