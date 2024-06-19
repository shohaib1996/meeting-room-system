import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { RoomServices } from "./room.service";

const createRoom = catchAsync(async (req, res) => {
  const roomData = req.body;

  const result = await RoomServices.createRoomIntoDB(roomData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room added successfully",
    data: result,
  });
});

export const RoomControllers = {
  createRoom,
};
