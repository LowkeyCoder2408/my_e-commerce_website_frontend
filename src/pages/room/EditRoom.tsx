import React, { useEffect, useRef, useState } from "react";
import { RoomModel } from "../../models/RoomModel";
import { toast } from "react-toastify";
import { getRoomById, updateRoom } from "../../api/RoomAPI";
import { useParams } from "react-router-dom";
import RoomTypeSelector from "../../common/RoomTypeSelector";
import { Button } from "react-bootstrap";
import { CircularProgress } from "@mui/material";

const EditRoom = () => {
  const [newRoom, setNewRoom] = useState<RoomModel>({
    mainRoomImage: null,
    relatedRoomImageFiles: [],
    roomTypeId: 0,
    roomPrice: 0,
  });
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputsRef = useRef<HTMLInputElement | null>(null);
  const { roomId } = useParams();

  const handleRoomTypeInputChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    const numericValue = value === "" ? 0 : parseInt(value);
    setNewRoom((prevRoom) => ({
      ...prevRoom,
      roomTypeId: numericValue,
    }));
  };

  const handleRoomPriceInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const numericValue = value === "" ? 0 : parseInt(value);
    setNewRoom((prevRoom) => ({
      ...prevRoom,
      roomPrice: numericValue,
    }));
  };

  const handleMainRoomImageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedImage = event.target.files[0];
      setNewRoom((prevRoom) => ({ ...prevRoom, mainRoomImage: selectedImage }));
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleRelatedRoomImagesInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      // Chuyển đổi FileList thành mảng File[]
      const selectedImages: File[] = Array.from(event.target.files);
      // Kết hợp ảnh hiện tại với ảnh mới
      setNewRoom((prevRoom) => ({
        ...prevRoom,
        relatedRoomImageFiles: [
          ...(prevRoom.relatedRoomImageFiles || []),
          // Nếu trước đó có ảnh thì vẫn giữ ảnh, nếu ko là [] => không ghi đè
          ...selectedImages,
          // Thêm các ảnh mới vào danh sách hiện tại
        ],
      }));

      const newImagePreviews = selectedImages.map((selectedImage) =>
        URL.createObjectURL(selectedImage)
      );
      setImagePreviews((prevImagePreviews) => [
        ...prevImagePreviews,
        ...newImagePreviews,
      ]);
    }
  };

  useEffect(() => {
    console.log(roomId);
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(parseInt(roomId ?? "0"));
        setNewRoom(roomData);
        setImagePreview(roomData.mainRoomImage);
      } catch (error) {
        console.log(error);
        toast.error("Đã xảy ra lỗi khi lấy phòng");
      }
    };
    fetchRoom();
  }, [roomId]);

  useEffect(() => {
    console.log(newRoom);
  }, [newRoom]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (!roomId) {
        throw new Error("Room ID is missing");
      }

      const response = await updateRoom(parseInt(roomId), newRoom);

      if (response.status === 200) {
        toast.success("Cập nhật thông tin phòng thành công");
        const updatedRoomData = await getRoomById(parseInt(roomId));
        setNewRoom(updatedRoomData);
        setImagePreview(updatedRoomData.mainRoomImage);
      } else {
        toast.error("Đã xảy ra lỗi khi cập nhật phòng");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật phòng");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sửa thông tin phòng</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="roomTypeId" className="form-label">
            Loại phòng
          </label>
          <div>
            <RoomTypeSelector
              handleRoomTypeInputChange={handleRoomTypeInputChange}
              newRoom={newRoom}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="roomPrice" className="form-label">
            Giá phòng
          </label>
          <input
            id="roomPrice"
            name="roomPrice"
            type="number"
            required
            className="form-control"
            value={newRoom.roomPrice}
            onChange={handleRoomPriceInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mainRoomImage" className="form-label">
            Ảnh phòng
          </label>
          <input
            id="mainRoomImage"
            name="mainRoomImage"
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleMainRoomImageInputChange}
            ref={fileInputRef}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              style={{ maxWidth: "200px", maxHeight: "200px" }}
              className="mb-3"
              alt="Ảnh phòng"
            />
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="relatedRoomImages" className="form-label">
            Ảnh liên quan
          </label>
          <input
            id="relatedRoomImages"
            name="relatedRoomImages"
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleRelatedRoomImagesInputChange}
            multiple
            ref={fileInputsRef}
          />
          {imagePreviews.map((imagePreview, index) => (
            <img
              key={index}
              src={imagePreview}
              style={{ maxWidth: "200px", maxHeight: "200px" }}
              className="mb-3"
              alt={`Ảnh bổ sung ${index + 1}`}
            />
          ))}
        </div>
        <div className="d-grid d-flex mt-2">
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Lưu phòng"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditRoom;
