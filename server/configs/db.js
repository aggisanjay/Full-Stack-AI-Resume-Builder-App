import mongoose, { mongo } from 'mongoose';


const connectDB = async() => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        let mongoURI=process.env.MONGODB_URI;
        const projectName='resume-builder';
        if(!mongoURI){
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
       
        if(mongoURI.endsWith('/')){
            mongoURI=mongoURI.slice(0,-1);
        }

        await mongoose.connect(`${mongoURI}/${projectName}`)


    } catch (error) {
        console.error('Error connecting to MongoDB:',error)
    }
  
}

export default connectDB
 