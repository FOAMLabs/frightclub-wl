import { ObjectId } from "mongodb";

export interface UserData {
  _id?: ObjectId;
  userID: number;
  address: string;
  ipAddress: string;
}
