import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { JsxElement } from 'typescript';

import { getTableItemsSelector, setCurrentPage } from '../../redux/slices/TableItemsSlice';
import { useAppDispatch } from '../../redux/store';

import styles from './Pagination.module.scss';

const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentPage, pages } = useSelector(getTableItemsSelector);

  const setButtons: (n: number) => JSX.Element[] = (pages) => {
    let buttonsElements = [];

    for (let i = 0; i < pages; i++) {
      buttonsElements.push(
        <button
          key={i}
          className={`${styles.button} ${currentPage === i ? styles.buttonActive : ''}`}
          type="button"
          onClick={() => dispatch(setCurrentPage(i))}
          disabled={pages < 2}
        >
          {i + 1}
        </button>,
      );
    }
    return buttonsElements;
  };

  return (
    <div className={styles.root}>
      <button
        className={styles.button}
        type="button"
        onClick={() => dispatch(setCurrentPage(currentPage - 1))}
        disabled={currentPage <= 0}
      >
        Назад
      </button>
      <div className={styles.buttonPages}>{setButtons(pages)}</div>
      <button
        className={styles.button}
        type="button"
        onClick={() => dispatch(setCurrentPage(currentPage + 1))}
        disabled={currentPage >= pages - 1}
      >
        Далее
      </button>
    </div>
  );
};

export default Pagination;
