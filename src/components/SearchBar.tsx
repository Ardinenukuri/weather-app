import React, { useState } from 'react';

const SearchBar: React.FC<{ onSearch: (city: string) => void }> = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;