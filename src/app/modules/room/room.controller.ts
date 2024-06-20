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
const getAllRoom = catchAsync(async (req, res) => {
  const result = await RoomServices.getAllRoomFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rooms retrieved successfully",
    data: result,
  });
});

const getSingleRoom = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RoomServices.getSingleRoomFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rooms retrieved successfully",
    data: result,
  });
});

const updateRoom = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await RoomServices.updateRoomFromDB(id, updatedData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room updated successfully",
    data: result,
  });
});
const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RoomServices.deleteRoomFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room deleted successfully",
    data: result,
  });
});

export const RoomControllers = {
  createRoom,
  getAllRoom,
  getSingleRoom,
  updateRoom,
  deleteStudent,
};
