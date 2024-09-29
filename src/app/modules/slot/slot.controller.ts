import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SlotServices } from "./slot.service";
import httpStatus from "http-status";

const createSlot = catchAsync(async (req: Request, res: Response) => {
  const slotData = req.body;

  const slots = await SlotServices.createSlotIntoDB(slotData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slots created successfully",
    data: slots,
  });
});
const getAllSlots = catchAsync(async (req: Request, res: Response) => {
  const slots = await SlotServices.getAllSlotFromDB(req.query);

  if (slots.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Available slots retrieved successfully",
      data: slots,
    });
  }
});
const updateSlot = catchAsync(async (req: Request, res: Response) => {
  const slotId = req.params.id;
  const updatedData = req.body;

  const updatedSlot = await SlotServices.updateSlotInDB(slotId, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot updated successfully",
    data: updatedSlot,
  });
});
const deleteSlot = catchAsync(async (req: Request, res: Response) => {
  const slotId = req.params.id;

  await SlotServices.deleteSlotFromDB(slotId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot deleted successfully",
    data: {}
  });
});
export const SlotControllers = {
  createSlot,
  getAllSlots,
  updateSlot,
  deleteSlot
};
