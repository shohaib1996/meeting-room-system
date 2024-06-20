import express from "express";
import validateRequest from "../../middlewares/validationRequest";
import { SlotValidation } from "./slot.validation";
import { SlotControllers } from "./slot.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/slots",
  auth(USER_ROLE.admin),
  validateRequest(SlotValidation.createSlotSchema),
  SlotControllers.createSlot
);
router.get(
  "/slots/availability",
  auth(USER_ROLE.admin, USER_ROLE.user),
  SlotControllers.getAllSlots
);

export const SlotRoutes = router;
