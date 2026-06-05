const mongoose = require("mongoose");

const connectDatabase = () => {
    // Check karne ke liye
    console.log("DB_URL from env:", process.env.DB_URL);

    mongoose.connect(process.env.DB_URL)
    .then((data) => {
        console.log(`mongod connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
        console.log(`Database connection error: ${err}`);
    });
};

module.exports = connectDatabase;