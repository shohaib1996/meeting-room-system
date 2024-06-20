import { z } from "zod";

const createBookingSchema = z.object({
  body: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    slots: z.array(z.string()),
    room: z.string().min(1),
    user: z.string().min(1),
  }),
});

export const BookingValidation = {
  createBookingSchema,
};
