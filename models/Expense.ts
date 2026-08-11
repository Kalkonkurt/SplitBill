import { ObjectId } from "mongodb";

export interface Expense {
  _id?: ObjectId;
  title: string;
  amount: number;
  category: string;
  paidBy: string;
  splitBetween: string[];
  groupId: ObjectId;
  createdAt: Date;
}