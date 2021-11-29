const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_URL, () => {
    console.log('Database is ready!');
});