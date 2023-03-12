import { TableItemType } from '../redux/slices/TableItemsSlice';

type PaginateType = (
  res: TableItemType[],
  pageSize: number,
) => {
  currentItems: TableItemType[][];
  pages: number;
  getItemsFromPage: (i: number) => TableItemType[];
};

export const paginateData: PaginateType = (res, pageSize) => {
  const currentItems: TableItemType[][] = [];

  const pages = Math.ceil(res.length / pageSize);

  let currentPage = 1;

  for (let p = 1; p <= pages; p++) {
    let start = pageSize * (p - 1);
    currentItems.push(res.slice(start, start + pageSize));
  }

  const getItemsFromPage: (i: number) => TableItemType[] = (page) => {
    if (page >= pages) {
      currentPage = pages - 1;
      return currentItems[currentPage];
    }

    if (page < 1) {
      currentPage = 0;
      return currentItems[currentPage];
    }

    currentPage = page - 1;

    return currentItems[currentPage];
  };

  return { currentItems, pages, getItemsFromPage };
};
