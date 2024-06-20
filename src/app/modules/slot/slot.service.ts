import QueryBuilder from "../../builder/QueryBuilder";
import { TSlot } from "./slot.interface";
import { Slot } from "./slot.model";

const createSlotIntoDB = async (slotData: TSlot) => {
  const { room, date, startTime, endTime } = slotData;
  const slotDuration = 60; // minutes

  const startMinutes = convertToMinutes(startTime);
  const endMinutes = convertToMinutes(endTime);
  const totalDuration = endMinutes - startMinutes;

  const numberOfSlots = totalDuration / slotDuration;
  const result: TSlot[] = [];
  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartTime = convertToTime(startMinutes + i * slotDuration);
    const slotEndTime = convertToTime(startMinutes + (i + 1) * slotDuration);

    const newSlot = await Slot.create({
      room,
      date,
      startTime: slotStartTime,
      endTime: slotEndTime,
      isBooked: false,
    });

    result.push(newSlot);
  }

  return result;
};

const getAllSlotFromDB = async (query: Record<string, unknown>) => {
  const slotQuery = new QueryBuilder(Slot.find().populate("room"), query)
    .filterByParams()
    .excludeBooked();
  const result = await slotQuery.modelQuery;
  return result;
};

const convertToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};
const convertToTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};
export const SlotServices = {
  createSlotIntoDB,
  getAllSlotFromDB,
};
