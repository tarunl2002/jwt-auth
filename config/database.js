const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

exports.connect = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("successfully connected to database");
    })
    .catch((error) => {
        console.log("database connection failed");
    });
};