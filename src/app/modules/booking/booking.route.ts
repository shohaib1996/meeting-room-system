import express from "express";
import validateRequest from "../../middlewares/validationRequest";

import { BookingControllers } from "./booking.controller";
import { BookingValidation } from "./booking.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/bookings",
  auth(USER_ROLE.user),
  validateRequest(BookingValidation.createBookingSchema),
  BookingControllers.createBooking
);

export const BookingRoutes = router;
