import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Room } from "../room/room.model";
import { Slot } from "../slot/slot.model";
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import QueryBuilder from "../../builder/QueryBuilder";

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

const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
  const bookingQuery = new QueryBuilder(
    Booking.find().populate("room").populate("slots").populate("user"),
    query
  ).excludeDeleted();
  const result = await bookingQuery.modelQuery;
  return result;
};

const getUserBookingsFromDB = async (userEmail: string) => {
  const user = await User.findOne({ email: userEmail });
  const userId = user?._id;

  const bookings = await Booking.find({ user: userId, isDeleted: false })
    .populate("room")
    .populate("slots")
    .populate("user");
  return bookings;
};

const updateBookingFromDB = async (
  bookingId: string,
  updateData: Partial<TBooking>
) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }

  const result = await Booking.findByIdAndUpdate(bookingId, updateData, {
    new: true,
  });
  return result;
};

const deleteBookingFromDB = async (bookingId: string) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }
  const result = await Booking.findByIdAndUpdate(
    bookingId,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getUserBookingsFromDB,
  updateBookingFromDB,
  deleteBookingFromDB,
};
