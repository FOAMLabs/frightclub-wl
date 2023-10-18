import { MongoClient, Timestamp } from "mongodb";

declare module './mongodb' {
  const clientPromise: Promise<MongoClient>;
  export default clientPromise;
}

export type UserData = {
    _id?: string | ObjectId;
    userID: Timestamp;
    address: string;
    ipAddress: string;
  };