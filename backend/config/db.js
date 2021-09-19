const Mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await Mongoose.connect(process.env.MONGO_URI, {
           
            useNewUrlParser: true,
            useUnifiedTopology: true

        });
        console.log(` MongoDB connected : ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error : ${error.message}`);
        process.exit();
    }
}

module.exports = connectDB;
