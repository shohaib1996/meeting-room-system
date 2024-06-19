import { Schema, model } from "mongoose";
import { TRoom } from "./room.interface";

const roomSchema = new Schema<TRoom>(
  {
    name: {
      type: String,
      required: [true, "Room name is required"],
      trim: true,
    },
    roomNo: {
      type: Number,
      required: [true, "Room number is required"],
      unique: true,
      min: [1, "Room number must be a positive integer"],
    },
    floorNo: {
      type: Number,
      required: [true, "Floor number is required"],
      min: [0, "Floor number must be a non-negative integer"],
    },
    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
      min: [1, "Capacity must be at least 1"],
    },
    pricePerSlot: {
      type: Number,
      required: [true, "Price per slot is required"],
      min: [0, "Price per slot must be a non-negative number"],
    },
    amenities: {
      type: [String],
      required: [true, "Amenities are required"],
      validate: {
        validator: function (value: string[]) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "Amenities must be a non-empty array",
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

export const Room = model<TRoom>("Room", roomSchema);
