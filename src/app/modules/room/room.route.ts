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
router.get("/rooms", RoomControllers.getAllRoom);
router.get("/rooms/:id", RoomControllers.getSingleRoom);
router.put(
  "/rooms/:id",
  validateRequest(RoomValidation.updateRoomValidationSchema),
  RoomControllers.updateRoom
);
router.delete("/rooms/:id", RoomControllers.deleteStudent);

export const RoomRoutes = router;
