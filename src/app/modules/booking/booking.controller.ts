import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const bookingData = req.body;

  const booking = await BookingServices.createBookingIntoDB(bookingData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking created successfully",
    data: booking,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const booking = await BookingServices.getAllBookingsFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All bookings retrieved successfully",
    data: booking,
  });
});
const getUserBookings = catchAsync(async (req, res) => {
  const userEmail = req.user.email;

  const bookings = await BookingServices.getUserBookingsFromDB(userEmail);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User bookings retrieved successfully",
    data: bookings,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getUserBookings,
};
