import React from "react";

interface RoomPaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const RoomPaginator = (props: RoomPaginatorProps) => {
  // Tạo 1 mảng pageNumbers, đối với các số ở vị trí index = i => giá trị nó là i + 1
  // const pageNumbers = Array.from({ length: props.totalPages }, (_, i) => i + 1);
  const pageNumbers: number[] = [];
  for (let i = 1; i <= props.totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pageNumbers.map((pageNumber, index) => (
          <li
            key={index}
            className={`page-item ${props.currentPage === pageNumber ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => props.onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default RoomPaginator;
