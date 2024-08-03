import React, { useEffect, useState } from "react";
import { RoomModel } from "../models/RoomModel";
import { RoomTypeModel } from "../models/RoomTypeModel";
import { getAllOfRoomTypes } from "../api/RoomTypeAPI";

interface RoomTypeSelectorProps {
  handleRoomTypeInputChange: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  newRoom: RoomModel;
}

const RoomTypeSelector = (props: RoomTypeSelectorProps) => {
  const [roomTypes, setRoomTypes] = useState<RoomTypeModel[]>([]);

  useEffect(() => {
    getAllOfRoomTypes().then((data) => {
      setRoomTypes(data.result);
    });
  }, []);

  return (
    <>
      {roomTypes.length > 0 && (
        <div>
          <select
            name="roomTypeId"
            id="roomTypeId"
            value={props.newRoom.roomTypeId}
            onChange={(event) => {
              props.handleRoomTypeInputChange(event);
            }}
          >
            <option value={""}>Chọn loại phòng:</option>
            {roomTypes.map((roomType, index) => (
              <option key={index} value={roomType.id}>
                {roomType.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};

export default RoomTypeSelector;
