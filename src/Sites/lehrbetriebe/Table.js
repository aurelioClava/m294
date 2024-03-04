import React, { useState, useEffect } from 'react';
import './table.css';
import { useNavigate } from 'react-router-dom';

const LehrbetriebTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  const filteredData = data.filter((item) =>
    item.firma.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetch('https://aurelio.undefiniert.ch/tbl_lehrbetriebe/all/all')
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
        <a href="lehrbetrieb/add">
          <button>Lehrbetrieb Hinzufügen</button>
        </a>
      </div>
    );
  }

  const handleEdit = (id) => {
    navigate("/lehrbetrieb/Edit/" + id);
  };

  const handleDelete = (id) => {
    fetch('https://aurelio.undefiniert.ch/tbl_lehrbetriebe/id_lehrbetrieb/' + id, {
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
          <th>Firma</th>
          <th>Strasse</th>
          <th>PLZ</th>
          <th>Ort</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id_lehrbetrieb}>
            <td>{item.id_lehrbetrieb}</td>
            <td>{item.firma}</td>
            <td>{item.strasse}</td>
            <td>{item.plz}</td>
            <td>{item.ort}</td>
            <td>
              <button onClick={() => handleEdit(item.id_lehrbetrieb)}>Edit</button>
              <button onClick={() => handleDelete(item.id_lehrbetrieb)}>Delete</button>
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

export default LehrbetriebTable;
