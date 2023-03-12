import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  fetchTableItems,
  getTableItemsSelector,
  Status,
  setItems,
} from '../../redux/slices/TableItemsSlice';
import { useAppDispatch } from '../../redux/store';
import TableItem from '../TableItem';

import styles from './Table.module.scss';

const Table: React.FC = () => {
  const { page } = useParams();
  const location = useLocation();

  const [sortByDesc, setSortByDesc] = React.useState(false);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const getTableItems = async () => {
      await dispatch(fetchTableItems());
    };

    getTableItems();
  }, []);

  const { items, currentItems, currentPage, pages, pageSize, status } =
    useSelector(getTableItemsSelector);

  /*  if (page && typeof +page === 'number' && pages >= +page) {
    //dispatch(setCurrentPage(+page));
    console.log(page, currentItems);
  } */
  /* console.log(location);
  location.pathname = `/${currentPage + 1}`;
  window.location.search = location.pathname; */

  const tableItemsElements = currentItems.map((item) => (
    <TableItem key={item.id} styles={styles} {...item} />
  ));

  const emptyTableItemsElements = [...new Array(pageSize)].map((item, idx) => (
    <TableItem key={idx} styles={styles} id={idx + 1} userId={0} title="" body="" />
  ));

  const handleSortClick = (type: 'id' | 'title' | 'body') => () => {
    if (items.length < 1 || status !== Status.SUCCESS) return;

    let sortedItems = [...items];

    sortedItems.sort((a, b) => {
      if (sortByDesc) {
        return a[type] > b[type] ? 1 : a[type] === b[type] ? 0 : -1;
      }
      return a[type] < b[type] ? 1 : a[type] === b[type] ? 0 : -1;
    });
    setSortByDesc(!sortByDesc);

    dispatch(setItems(sortedItems));
  };

  return (
    <section aria-label="Таблица" className={styles.root}>
      <nav className={`${styles.row} ${styles.header}`}>
        <button
          onClick={handleSortClick('id')}
          className={styles.idHeader}
          type="button"
          disabled={items.length < 1}
        >
          ID
        </button>
        <button
          onClick={handleSortClick('title')}
          className={styles.titleHeader}
          type="button"
          disabled={items.length < 1}
        >
          Заголовок
        </button>
        <button
          onClick={handleSortClick('body')}
          className={styles.descHeader}
          type="button"
          disabled={items.length < 1}
        >
          Описание
        </button>
      </nav>
      <ul className={styles.rows}>
        {status === Status.ERROR ? (
          <TableItem styles={styles} id={0} userId={0} title="Что-то пошло не так" body={status} />
        ) : status === Status.SUCCESS ? (
          tableItemsElements
        ) : (
          emptyTableItemsElements
        )}
      </ul>
    </section>
  );
};

export default Table;
