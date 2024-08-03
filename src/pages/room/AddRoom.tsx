import React, { useEffect, useState, useRef } from "react";
import { RoomModel } from "../../models/RoomModel";
import { addRoom } from "../../api/RoomAPI";
import RoomTypeSelector from "../../common/RoomTypeSelector";
import { toast } from "react-toastify";
import { Button, CircularProgress } from "@mui/material";

const AddRoom = () => {
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

  useEffect(() => {
    console.log(newRoom);
  }, [newRoom]);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newRoom.roomTypeId === 0) {
      toast.error("Vui lòng chọn loại phòng");
      return;
    }
    if (newRoom.roomPrice < 0) {
      toast.error("Giá phòng không thể là số âm");
      return;
    }
    if (!newRoom.mainRoomImage) {
      toast.error("Vui lòng chọn ảnh cho phòng");
      return;
    }
    if (newRoom.mainRoomImage instanceof File) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(newRoom.mainRoomImage.type)) {
        toast.error("Vui lòng chọn một ảnh hợp lệ (JPEG, PNG, GIF)");
        return;
      }
    } else {
      toast.error("Đã xảy ra lỗi với ảnh");
      return;
    }
    if (
      newRoom.relatedRoomImageFiles !== undefined &&
      newRoom.relatedRoomImageFiles?.length > 5
    ) {
      toast.error("Vui lòng tải tối đa 5 ảnh liên quan");
      return;
    }

    setIsLoading(true);
    try {
      const success = await addRoom(
        newRoom.mainRoomImage,
        newRoom.relatedRoomImageFiles || [],
        newRoom.roomTypeId,
        newRoom.roomPrice
      );
      if (success) {
        toast.success("Thêm phòng mới thành công");
        setNewRoom({
          mainRoomImage: null,
          relatedRoomImageFiles: [],
          roomTypeId: 0,
          roomPrice: 0,
        });
        setImagePreview("");
        setImagePreviews([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        if (fileInputsRef.current) {
          fileInputsRef.current.value = "";
        }
      } else {
        toast.error("Đã xảy ra lỗi trong quá trình thêm phòng");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Đã xảy ra lỗi với ảnh: " + error.message);
      } else {
        toast.error("Đã xảy ra lỗi không xác định");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Thêm phòng mới</h2>
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

export default AddRoom;
