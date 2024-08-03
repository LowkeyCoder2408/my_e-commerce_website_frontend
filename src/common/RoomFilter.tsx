import React, { ChangeEvent, useEffect, useState } from "react";
import { RoomModel } from "../models/RoomModel";

interface RoomFilterProps {
  data: RoomModel[];
  setFilteredData: React.Dispatch<React.SetStateAction<RoomModel[]>>;
}

const RoomFilter = (props: RoomFilterProps) => {
  const [filter, setFilter] = useState<string>("");

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedRoomTypeName = event.target.value;
    setFilter(selectedRoomTypeName);
    const filteredRooms: RoomModel[] = props.data.filter(
      (room: RoomModel) => room.roomType?.name === selectedRoomTypeName
    );
    props.setFilteredData(filteredRooms);
  };

  const clearFilter = () => {
    setFilter("");
    props.setFilteredData(props.data);
  };

  const roomTypeNames: string[] = [
    ...Array.from(
      new Set(
        props.data
          .map((room: RoomModel) => room.roomType?.name)
          .filter((name): name is string => name !== undefined)
      )
    ),
  ];

  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="room-type-filter">
        Lọc phòng theo loại phòng
      </span>
      <select
        className="form-select"
        value={filter}
        onChange={handleSelectChange}
      >
        <option value="">Chọn loại phòng để lọc...</option>
        {roomTypeNames.map((roomTypeName, index) => (
          <option key={index} value={roomTypeName}>
            {roomTypeName}
          </option>
        ))}
      </select>
      <button className="btn btn-hotel" type="button" onClick={clearFilter}>
        Bỏ lọc
      </button>
    </div>
  );
};

export default RoomFilter;
