import React from 'react';
import './Pagination.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

interface PaginationProps {
  currentPage: number;
  numberOfPage: number;
  pagination: any;
}

export const Pagination: React.FC<PaginationProps> = (props) => {
  const pageList = [];

  // if (props.currentPage === 1) {
  //   pageList.push(props.currentPage);
  //   if (props.numberOfPage >= props.currentPage + 1) {
  //     pageList.push(props.currentPage + 1);
  //   }
  //   if (props.numberOfPage >= props.currentPage + 2) {
  //     pageList.push(props.currentPage + 2);
  //   }
  // } else if (props.currentPage > 1) {
  //   if (props.currentPage >= 3) {
  //     pageList.push(props.currentPage - 2);
  //   }
  //   if (props.currentPage >= 2) {
  //     pageList.push(props.currentPage - 1);
  //   }
  //   pageList.push(props.currentPage);
  //   if (props.numberOfPage >= props.currentPage + 1) {
  //     pageList.push(props.currentPage + 1);
  //   }
  //   if (props.numberOfPage >= props.currentPage + 2) {
  //     pageList.push(props.currentPage + 2);
  //   }
  // }

  if (props.currentPage === 1) {
    pageList.push(props.currentPage);
    if (props.numberOfPage >= props.currentPage + 1) {
      pageList.push(props.currentPage + 1);
    }
    if (props.numberOfPage >= props.currentPage + 2) {
      pageList.push(props.currentPage + 2);
    }
  } else if (props.currentPage > 1) {
    if (props.numberOfPage > 2 && props.numberOfPage == props.currentPage) {
      pageList.push(props.currentPage - 2);
    }
    if (props.currentPage >= 2) {
      pageList.push(props.currentPage - 1);
    }
    pageList.push(props.currentPage);
    if (props.numberOfPage >= props.currentPage + 1) {
      pageList.push(props.currentPage + 1);
    }
  }

  return (
    <nav
      aria-label=""
      className="pagination__navbar bg-transparent d-flex align-items-center"
    >
      <ul className="pagination">
        <li onClick={() => props.pagination(1)} className="page-item">
          <button className="page-link">
            <FontAwesomeIcon icon={faChevronLeft as IconProp} />
          </button>
        </li>

        {pageList.map((page) => (
          <li
            onClick={() => {
              props.pagination(page);
            }}
            className="page-item"
            key={page}
          >
            <button
              className={
                'page-link ' + (props.currentPage === page ? 'active' : '')
              }
            >
              {page}
            </button>
          </li>
        ))}

        <li
          className="page-item"
          onClick={() => props.pagination(props.numberOfPage)}
        >
          <button className="page-link">
            <FontAwesomeIcon icon={faChevronRight as IconProp} />
          </button>
        </li>
      </ul>
    </nav>
  );
};
