import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TRoom } from "./room.interface";
import { Room } from "./room.model";
import QueryBuilder from "../../builder/QueryBuilder";

const createRoomIntoDB = async (roomData: TRoom) => {
  const result = await Room.create(roomData);
  return result;
};

const getAllRoomFromDB = async (query: Record<string, unknown>) => {
  const roomQuery = new QueryBuilder(Room.find(), query)
    .excludeDeleted()
    .filterByParams()
    .sortByPrice();
  const result = await roomQuery.modelQuery;
  return result;
};
const getSingleRoomFromDB = async (id: string) => {
  const result = await Room.findById(id);
  return result;
};
const updateRoomFromDB = async (id: string, updatedData: Partial<TRoom>) => {
  const result = await Room.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Room not found or failed to update"
    );
  }

  return result;
};

const deleteRoomFromDB = async (id: string) => {
  const result = await Room.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    }
  );

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete Room ");
  }

  return result;
};

export const RoomServices = {
  createRoomIntoDB,
  getAllRoomFromDB,
  getSingleRoomFromDB,
  updateRoomFromDB,
  deleteRoomFromDB,
};
