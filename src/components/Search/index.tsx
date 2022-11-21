import React from 'react';

import style from './Search.module.scss';

const Search: React.FC = () => {
  const [query, setQuery] = React.useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(event.target.value);

  return (
    <div className={style.search}>
      <svg
        className={style.icon}
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M15.8072 15.4667L11.5405 11.2M7.27387 13.3333C6.43341 13.3333 5.60118 13.1678 4.8247 12.8462C4.04821 12.5245 3.34268 12.0531 2.74839 11.4588C2.15409 10.8645 1.68267 10.159 1.36104 9.38251C1.03941 8.60602 0.873871 7.77379 0.873871 6.93333C0.873871 6.09287 1.03941 5.26064 1.36104 4.48416C1.68267 3.70768 2.15409 3.00214 2.74839 2.40785C3.34268 1.81355 4.04821 1.34213 4.8247 1.0205C5.60118 0.698874 6.43341 0.533333 7.27387 0.533333C8.97126 0.533333 10.5991 1.20762 11.7994 2.40785C12.9996 3.60808 13.6739 5.23595 13.6739 6.93333C13.6739 8.63072 12.9996 10.2586 11.7994 11.4588C10.5991 12.659 8.97126 13.3333 7.27387 13.3333Z"
            stroke="#727C85"
          />
        </g>
      </svg>
      <input
        type="text"
        className={style.input}
        value={query}
        onChange={handleInputChange}
        placeholder="Поиск..."
      />
    </div>
  );
};

export default Search;
