import React, { useState, useEffect } from 'react';
import './table.css';
import { useNavigate } from 'react-router-dom';

const LänderTable = () => {
  const [data, setData] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  const filteredData = data.filter((item) =>
    item.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetch('https://aurelio.undefiniert.ch/tbl_countries/all/all', {method: 'GET'})
       .then((response) => response.json())
       .then((data) => {
          setData(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
  }, []);

  function SearchBar({ searchTerm, handleSearch, handleClear }) {
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={handleClear}>Clear</button>
        <a href="Länder/add">
          <button>Land Hinzufügen</button>
        </a>
      </div>
    );
  }

  const handleDelete = (id) => {
    fetch('https://aurelio.undefiniert.ch/tbl_countries/id_country/' + id, {
      method: 'DELETE',}).then(() => {
        window.location.reload();
      });
  }


function DataTable({ data }) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Land</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id_country}>
            <td>{item.id_country}</td>
            <td>{item.country}</td>
            <td>
              <button onClick={() => handleDelete(item.id_country)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
return (
  <div>
    <div className="content">
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} handleClear={handleClear} />
      <DataTable data={filteredData} />
    </div>
  </div>
);
}

export default LänderTable;
