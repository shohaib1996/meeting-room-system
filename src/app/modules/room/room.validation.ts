import { z } from "zod";

const roomValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, { message: "Room name is required" }),
    roomNo: z
      .number()
      .int({ message: "Room number must be an integer" })
      .positive({ message: "Room number must be a positive integer" }),
    floorNo: z
      .number()
      .int({ message: "Floor number must be an integer" })
      .nonnegative({ message: "Floor number must be a non-negative integer" }),
    capacity: z
      .number()
      .int({ message: "Capacity must be an integer" })
      .positive({ message: "Capacity must be at least 1" }),
    pricePerSlot: z
      .number()
      .nonnegative({ message: "Price per slot must be a non-negative number" }),
    amenities: z
      .array(z.string())
      .min(1, { message: "Amenities are required" }),
    isDeleted: z.boolean().optional().default(false),
  }),
});
export const RoomValidation = {
  roomValidationSchema,
};
