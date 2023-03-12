type TableItemProps = {
  styles: any;
  body: string;
  id: number;
  title: string;
  userId: number;
};

const TableItem: React.FC<TableItemProps> = ({ styles, id, body, title }) => {
  return (
    <li>
      <article className={styles.row}>
        <div className={`${styles.idColumn} ${styles.cell}`}>{id}</div>
        <h2 className={`${styles.titleColumn} ${styles.cell}`}>{title}</h2>
        <p className={`${styles.descColumn} ${styles.cell}`}>{body}</p>
      </article>
    </li>
  );
};

export default TableItem;
