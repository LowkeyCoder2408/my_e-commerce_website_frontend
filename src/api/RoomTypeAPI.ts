import { RoomTypeModel } from "../models/RoomTypeModel";
import { backendEndpoint } from "../utils/Variables";
import { myRequest } from "./MyRequest";

interface ResultInterface {
  result: RoomTypeModel[];
}

async function getRoomTypes(url: string): Promise<ResultInterface> {
  try {
    const result: RoomTypeModel[] = [];
    const responseData = await myRequest(url);

    for (const key in responseData) {
      result.push({
        id: responseData[key].id,
        name: responseData[key].name,
        mainImage: responseData[key].mainImage,
        description: responseData[key].description,
      });
    }

    return {
      result: result,
    };
  } catch (error) {
    console.error("Lỗi khi fetch room-type:", error);
    return { result: [] };
  }
}

export async function getAllOfRoomTypes(): Promise<ResultInterface> {
  const url = `${backendEndpoint}/room-types/get-room-types/all`;
  return getRoomTypes(url);
}
