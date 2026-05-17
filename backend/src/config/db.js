import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/loading_bharat';
  try {
    await mongoose.connect(uri);
    console.log(process.env.MONGO_URI ? 'Connected to MongoDB Atlas' : 'Connected to Local MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

export default connectDB;
