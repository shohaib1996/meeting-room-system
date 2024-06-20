import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const bookingData = req.body;

  const booking = await BookingServices.createBookingIntoDB(bookingData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking created successfully",
    data: booking,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const booking = await BookingServices.getAllBookingsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All bookings retrieved successfully",
    data: booking,
  });
});
const getUserBookings = catchAsync(async (req, res) => {
  const userEmail = req.user.email;

  const bookings = await BookingServices.getUserBookingsFromDB(userEmail);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User bookings retrieved successfully",
    data: bookings,
  });
});

const updateBookings = catchAsync(async (req, res) => {
  const bookingId = req.params.id;
  const updateData = req.body;

  const updatedBooking = await BookingServices.updateBookingFromDB(
    bookingId,
    updateData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking updated successfully",
    data: updatedBooking,
  });
});
const deleteBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.deleteBookingFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking deleted successfully",
    data: result,
  });
});
export const BookingControllers = {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBookings,
  deleteBooking,
};
