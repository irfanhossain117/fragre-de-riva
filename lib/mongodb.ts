import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI inside .env.local");
}

declare global {
  var mongoose:
    | {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
      }
    | undefined;
}

const cached = global.mongoose ?? {
  conn: null,
  promise: null,
};

global.mongoose = cached;

export async function connectDB(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, {
      dbName: "perfume_db",
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
  }

  cached.conn = await cached.promise;

  return cached.conn;
}