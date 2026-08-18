import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  phone?: string;
  avatarUrl?: string;
  passwordHash: string;
  createdAt: Date;
}
