import { z } from "zod";

const createSlotSchema = z.object({
  body: z.object({
    room: z.string().min(1),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    startTime: z.string().regex(/^\d{2}:\d{2}$/),
    endTime: z.string().regex(/^\d{2}:\d{2}$/),
  }),
});

export const SlotValidation = {
  createSlotSchema,
};
