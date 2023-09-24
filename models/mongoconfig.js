const dbconnect = ()=> {
    const mongoose = require('mongoose');
    mongoose.connect(process.env.MONGO_CLIENT).then(() => { console.log('mongoose connected') });
}

module.exports = dbconnect;