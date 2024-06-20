import express from "express";
import validateRequest from "../../middlewares/validationRequest";
import { RoomValidation } from "./room.validation";
import { RoomControllers } from "./room.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/rooms",
  auth(USER_ROLE.admin),
  validateRequest(RoomValidation.roomValidationSchema),
  RoomControllers.createRoom
);
router.get(
  "/rooms",
  auth(USER_ROLE.admin, USER_ROLE.user),
  RoomControllers.getAllRoom
);
router.get(
  "/rooms/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  RoomControllers.getSingleRoom
);
router.put(
  "/rooms/:id",
  auth(USER_ROLE.admin),
  validateRequest(RoomValidation.updateRoomValidationSchema),
  RoomControllers.updateRoom
);
router.delete(
  "/rooms/:id",
  auth(USER_ROLE.admin),
  RoomControllers.deleteStudent
);

export const RoomRoutes = router;
