import { Types } from "mongoose";

export type TBooking = {
  room: Types.ObjectId;
  slots: Types.ObjectId[];
  user: Types.ObjectId;
  date: string;
  totalAmount?: number;
  isConfirmed?: "unconfirmed" | "confirmed" | "canceled";
  isDeleted?: boolean;
};
