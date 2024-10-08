import React from 'react';
import styles from './scss/Pagination.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface PaginationProps {
  currentPage: number;
  numberOfPage: number;
  pagination: any;
}

export const Pagination: React.FC<PaginationProps> = (props) => {
  const pageList = [];
  if (props.currentPage === 1) {
    pageList.push(props.currentPage);
    if (props.numberOfPage >= props.currentPage + 1) {
      pageList.push(props.currentPage + 1);
    }
    if (props.numberOfPage >= props.currentPage + 2) {
      pageList.push(props.currentPage + 2);
    }
  } else if (props.currentPage > 1) {
    if (props.numberOfPage > 2 && props.numberOfPage === props.currentPage) {
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
      className={`${cx('pagination__navbar')} bg-transparent d-flex align-items-center`}
    >
      <ul className={cx('pagination')}>
        <li onClick={() => props.pagination(1)} className={cx('page-item')}>
          <button className={cx('page-link')}>
            <FontAwesomeIcon icon={faChevronLeft as IconProp} />
          </button>
        </li>

        {pageList.map((page) => (
          <li
            onClick={() => {
              props.pagination(page);
            }}
            className={cx('page-item')}
            key={page}
          >
            <button
              className={cx('page-link', {
                active: props.currentPage === page,
              })}
            >
              {page}
            </button>
          </li>
        ))}

        <li
          className={cx('page-item')}
          onClick={() => props.pagination(props.numberOfPage)}
        >
          <button className={cx('page-link')}>
            <FontAwesomeIcon icon={faChevronRight as IconProp} />
          </button>
        </li>
      </ul>
    </nav>
  );
};
