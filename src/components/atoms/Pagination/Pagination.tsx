import React from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
  totalItemsLength: number;
  activePage: number;
  onPageClick: (page: number) => void;
  size?: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItemsLength,
  activePage,
  onPageClick,
  size = 9,
  totalPages,
}) => {
  const pages = totalPages ?? Math.ceil(totalItemsLength / size);

  if (pages <= 1) return null;

  return (
    <div className={styles.pagination}>
      {Array.from({ length: pages }, (_, index) => {
        const pageNumber = index + 1;
        return (
          <React.Fragment key={pageNumber}>
            <span
              className={`${styles.page} ${activePage === pageNumber ? styles.active : ''}`}
              onClick={() => onPageClick(pageNumber)}
            >
              {pageNumber}
            </span>
            {pageNumber < pages && <span className={styles.separator}>|</span>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Pagination;
