import React, { ChangeEvent, ChangeEventHandler } from 'react';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  console.log('searchValue  ', searchValue);
  return (
    <header className={styles.root}>
      <input
        ref={inputRef}
        type="text"
        className={styles.search}
        placeholder="Поиск"
        onChange={handleChange}
        value={searchValue}
      />
    </header>
  );
};

export default Header;
