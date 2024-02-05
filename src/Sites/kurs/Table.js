import React, { useState, useEffect } from 'react';
import './table.css';

function Table() {
  const [data, setData] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  const filteredData = data.filter((item) =>
    item.kursnummer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetch('https://aurelio.undefiniert.ch/tbl_kurse/all/all')
       .then((response) => response.json())
       .then((data) => {
          setData(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
  }, []);

  return (
    <div>
      <div className="content">
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} handleClear={handleClear} />
        <DataTable data={filteredData} />
      </div>
    </div>
  );
}

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
      <a href="kurse/edit">
        <button>Kurs Hinzufügen</button>
      </a>
    </div>
  );
}

const handleEdit = (id) => {
  
  console.log(`Edit course with ID: ${id}`);
};

const handleDelete = (id) => {
  fetch('https://aurelio.undefiniert.ch/tbl_kurse/id_kurs/' + id, {
    method: 'DELETE',}).then(() => {
      window.location.reload();
    });
  
};


function DataTable({ data }) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Kursnummer</th>
          <th>Kursthema</th>
          <th>Inhalt</th>
          <th>Startdatum</th>
          <th>Enddatum</th>
          <th>Dauer</th>
          <th>nr_dozent</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id_kurs}>
            <td>{item.id_kurs}</td>
            <td>{item.kursnummer}</td>
            <td>{item.kursthema}</td>
            <td>{item.kursinhalt}</td>
            <td>{item.startdatum}</td>
            <td>{item.enddatum}</td>
            <td>{item.dauer}</td>
            <td>{item.nr_dozent}</td>
            <td>
              <button onClick={() => handleEdit(item.id_kurs)}>Edit</button>
              <button onClick={() => handleDelete(item.id_kurs)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
