import { TRoom } from "./room.interface";
import { Room } from "./room.model";

const createRoomIntoDB = async (roomData: TRoom) => {
  const result = await Room.create(roomData);
  return result;
};

export const RoomServices = {
  createRoomIntoDB,
};
