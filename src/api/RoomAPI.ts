import axios from "axios";
import { RoomModel } from "../models/RoomModel";
import { api, backendEndpoint } from "../utils/Variables";
import { myRequest } from "./MyRequest";

interface ResultInterface {
  result: RoomModel[];
}

async function getRooms(url: string): Promise<ResultInterface> {
  try {
    const result: RoomModel[] = [];
    const responseData = await myRequest(url);
    for (const key in responseData) {
      result.push({
        id: responseData[key].id,
        roomTypeId: responseData[key].roomType.id,
        roomType: responseData[key].roomType,
        roomPrice: responseData[key].roomPrice,
        description: responseData[key].description,
        isBooked: responseData[key].isBooked,
        mainRoomImage: responseData[key].mainRoomImage,
        relatedRoomImageFiles: responseData[key].relatedRoomImageFiles,
        enabled: responseData[key].enabled,
        createdTime: responseData[key].createdTime,
        updatedTime: responseData[key].updatedTime,
        ratingCount: responseData[key].ratingCount,
        averageRating: responseData[key].averageRating,
        bookings: responseData[key].bookings,
      });
    }
    return {
      result: result,
    };
  } catch (error) {
    console.log("Lỗi khi fetch room: ", error);
    return {
      result: [],
    };
  }
}

export async function getAllRooms(): Promise<ResultInterface> {
  const url = `${backendEndpoint}/rooms`;
  return getRooms(url);
}

// Room functions
// This function adds a new room to the database
export async function addRoom(
  mainRoomImage: File | null,
  relatedRoomImageFiles: File[],
  roomTypeId: number,
  roomPrice: number
) {
  const formData = new FormData();
  mainRoomImage && formData.append("mainRoomImage", mainRoomImage);
  if (relatedRoomImageFiles.length > 0) {
    relatedRoomImageFiles.forEach((relatedRoomImageFile) => {
      formData.append("relatedRoomImages", relatedRoomImageFile);
    });
  }
  formData.append("roomTypeId", roomTypeId.toString());
  formData.append("roomPrice", roomPrice.toString());

  try {
    const response = await api.post("/rooms/add/new-room", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.status === 201;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Lỗi khi thêm phòng:", error.response.data);
      console.error("Status Code:", error.response.status);
    } else {
      console.error("Lỗi khi thêm phòng:", error);
    }
    return false;
  }
}

// This function gets all of the rooms from the database
export async function getAllOfRooms() {
  try {
    const result = await api.get("/rooms/get-rooms/all");
    return result.data;
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách phòng");
  }
}

export async function deleteARoom(roomId: number) {
  try {
    const result = await api.delete(`/rooms/delete/${roomId}`);
    return result.data;
  } catch (error) {
    throw new Error("Lỗi khi xóa phòng");
  }
}

export async function updateRoom(roomId: number, roomData: RoomModel) {
  const formData = new FormData();

  if (roomData.roomTypeId !== undefined) {
    formData.append("roomTypeId", roomData.roomTypeId.toString());
  } else {
    throw new Error("roomTypeId is undefined");
  }

  if (roomData.roomPrice !== undefined) {
    formData.append("roomPrice", roomData.roomPrice.toString());
  } else {
    throw new Error("roomPrice is undefined");
  }

  if (roomData.mainRoomImage) {
    formData.append("mainRoomImage", roomData.mainRoomImage);
  }

  if (
    roomData.relatedRoomImageFiles &&
    roomData.relatedRoomImageFiles.length > 0
  ) {
    roomData.relatedRoomImageFiles.forEach((relatedRoomImageFile) => {
      formData.append("relatedRoomImages", relatedRoomImageFile);
    });
  }

  try {
    const response = await api.put(`/rooms/update/${roomId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error updating room:", error);
    throw error;
  }
}

export async function getRoomById(roomId: number) {
  try {
    const result = await api.get(`/rooms/room/${roomId}`);
    return result.data;
  } catch (error) {
    throw new Error("Đã xảy ra lỗi khi lấy phòng theo id");
  }
}
