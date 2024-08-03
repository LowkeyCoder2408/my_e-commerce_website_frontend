import { useEffect, useState } from "react";
import { RoomModel } from "../../models/RoomModel";
import { deleteARoom, getAllOfRooms } from "../../api/RoomAPI";
import { toast } from "react-toastify";
import { Col, Spinner } from "react-bootstrap";
import RoomFilter from "../../common/RoomFilter";
import RoomPaginator from "../../common/RoomPaginator";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExistingRooms = () => {
  const [rooms, setRooms] = useState<RoomModel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [roomsPerPage, setRoomsPerPage] = useState<number>(8);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [filteredRooms, setFilteredRooms] = useState<RoomModel[]>([]);
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState<number>(0);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const result = await getAllOfRooms();
      setRooms(result);
      setIsLoading(false);
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi lấy dữ liệu các phòng");
    }
  };

  useEffect(() => {
    if (selectedRoomTypeId === 0) {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter(
        (room) => room.roomTypeId === selectedRoomTypeId
      );
      setFilteredRooms(filtered);
    }
    setCurrentPage(1);
  }, [rooms, selectedRoomTypeId]);

  const calculateTotalPages = (
    filteredRooms: RoomModel[],
    roomsPerPage: number,
    rooms: RoomModel[]
  ) => {
    const totalRooms =
      filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
    return Math.ceil(totalRooms / roomsPerPage);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const handlePaginationClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (roomId: number) => {
    setIsDeleting(true);
    try {
      const result = await deleteARoom(roomId);
      if (result === "") {
        toast.success(`Đã xóa phòng thành công`);
        setIsDeleting(false);
        fetchRooms();
      } else {
        toast.error(`Đã xảy ra lỗi khi xóa phòng`);
        console.error(`Lỗi khi xóa phòng: ${result.message}`);
      }
    } catch (error) {
      toast.error(`Đã xảy ra lỗi khi xóa phòng`);
    }
  };

  return (
    <>
      {isLoading ? (
        <p>Đang tải dữ liệu phòng</p>
      ) : (
        <>
          <section className="mt-5 mb-5 container">
            <div className="d-flex justify-content-center mb-3 mt-5">
              <h2>Danh sách phòng hiện có</h2>
            </div>
            <Col md={6} className="mb-3 mb-md-0">
              <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
            </Col>
            <table className="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>Mã phòng</th>
                  <th>Loại phòng</th>
                  <th>Giá phòng</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {currentRooms.map((room) => (
                  <tr key={room.id} className="text-center">
                    <td>{room.id}</td>
                    <td>{room.roomType?.name}</td>
                    <td>{room.roomPrice}</td>
                    <td className="gap-2">
                      <Link to={`/rooms/edit/${room.id}`}>
                        <span className="btn btn-info">
                          <FaEye />
                        </span>
                        <span className="btn btn-warning">
                          <FaEdit />
                        </span>
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          if (room.id !== undefined) {
                            handleDelete(room.id);
                          }
                        }}
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          <FaTrashAlt />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <RoomPaginator
              currentPage={currentPage}
              totalPages={calculateTotalPages(
                filteredRooms,
                roomsPerPage,
                rooms
              )}
              onPageChange={handlePaginationClick}
            />
          </section>
        </>
      )}
    </>
  );
};

export default ExistingRooms;
