import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validationRequest";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(UserValidation.createUserSchemaValidation),
  UserControllers.createUser
);

router.post(
  "/login",
  validateRequest(UserValidation.loginValidationSchema),
  UserControllers.loginUser
);
router.get("/user", UserControllers.getSingleUserByEmail);
// router.get("/user", UserControllers.getSingleUserByEmail);


export const UserRoutes = router;
