const mongoose = require('mongoose')
const chalk =require( 'chalk');


const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI )
        // console.log('mongoose Connected : '+ conn.connection.host);
        console.log('MongoDB Connected : ' + chalk.cyan.underline(conn.connection.host));

    }catch(err){
        console.log(err);
        process.exit(1)
    }
}
module.exports =connectDB