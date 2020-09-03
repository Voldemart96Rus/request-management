import React from 'react';

const Search = ({setQuery}) => (
    <div>
        <input
            className="form-control my-3"
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Поиск"
        />
    </div>
);

export default Search;
