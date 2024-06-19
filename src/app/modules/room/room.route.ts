import express from "express";
import validateRequest from "../../middlewares/validationRequest";
import { RoomValidation } from "./room.validation";
import { RoomControllers } from "./room.controller";

const router = express.Router();

router.post(
  "/rooms",
  validateRequest(RoomValidation.roomValidationSchema),
  RoomControllers.createRoom
);

export const RoomRoutes = router;
