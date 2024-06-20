import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Room } from "../room/room.model";
import { Slot } from "../slot/slot.model";
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (bookingData: TBooking) => {
  const { date, slots, room, user } = bookingData;

  const slotDocs = await Slot.find({ _id: { $in: slots }, isBooked: false });
  if (slotDocs.length !== slots.length) {
    throw new AppError(httpStatus.NOT_FOUND, "Some slots are already booked");
  }

  const roomDoc = await Room.findById(room);
  const userDoc = await User.findById(user);

  if (!roomDoc || !userDoc) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid room or user");
  }

  const totalAmount = roomDoc.pricePerSlot * slots.length;

  const booking = await Booking.create({
    date,
    slots,
    room,
    user,
    totalAmount,
    isConfirmed: "unconfirmed",
    isDeleted: false,
  });

  await Slot.updateMany({ _id: { $in: slots } }, { isBooked: true });

  const result = await Booking.findById(booking._id)
    .populate("room")
    .populate("slots")
    .populate("user");

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
};
