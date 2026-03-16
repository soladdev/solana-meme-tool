import { MONGODB_URL } from '@/lib/constant';
import mongoose from 'mongoose';

const connectOptions: mongoose.ConnectOptions = {
  autoCreate: true,
  retryReads: true,
};

let connectionPromise: Promise<typeof mongoose> | null = null;

/**
 * Connects to MongoDB. Reuses existing connection if already connected.
 * Mongoose handles connection pooling internally.
 */
const connectMongodb = (): Promise<typeof mongoose> => {
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve(mongoose);
  }
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(MONGODB_URL, connectOptions);
  }
  return connectionPromise;
};

export default connectMongodb;
