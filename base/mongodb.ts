import { MONGODB_URL } from '@/lib/constant';
import mongoose from 'mongoose';

const connectOptions: mongoose.ConnectOptions = {
  autoCreate: true,
  retryReads: true,
};
const connectMongodb = () => {
  console.log("🚀 ~ connectMongodb ~ MONGODB_URL:", MONGODB_URL)
  return mongoose.connect(MONGODB_URL, connectOptions);
}
export default connectMongodb;
