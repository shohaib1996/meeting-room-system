import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SlotServices } from "./slot.service";

const createSlot = catchAsync(async (req: Request, res: Response) => {
  const slotData = req.body;

  const slots = await SlotServices.createSlotIntoDB(slotData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Slots created successfully",
    data: slots,
  });
});
const getAllSlots = catchAsync(async (req: Request, res: Response) => {
  const slots = await SlotServices.getAllSlotFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Available slots retrieved successfully",
    data: slots,
  });
});
export const SlotControllers = {
  createSlot,
  getAllSlots,
};
