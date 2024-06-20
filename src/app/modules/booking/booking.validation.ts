import { z } from "zod";

const createBookingSchema = z.object({
  body: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    slots: z.array(z.string()),
    room: z.string().min(1),
    user: z.string().min(1),
  }),
});
const updateBookingSchema = z.object({
  body: z
    .object({
      date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/)
        .optional(),
      slots: z.array(z.string()).optional(),
      room: z.string().min(1).optional(),
      user: z.string().min(1).optional(),
      isConfirmed: z.enum(["unconfirmed", "confirmed", "canceled"]).optional(),
      isDeleted: z.boolean().optional(),
      totalAmount: z.number().optional(),
    })
    .partial(),
});

export const BookingValidation = {
  createBookingSchema,
  updateBookingSchema,
};
