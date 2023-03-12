import Header from '../Header';
import Pagination from '../Pagination';
import Table from '../Table';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.root}>
      <Header />
      <Table />
      <Pagination />
    </div>
  );
}

export default App;
