import React, { useState, useEffect } from 'react';
import './table.css';
import { useNavigate } from 'react-router-dom';

const LernendeTable = () => {
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
    item.nachname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetch('https://aurelio.undefiniert.ch/tbl_lernende/all/all')
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
        <a href="lernende/add">
          <button>Lernender Hinzufügen</button>
        </a>
      </div>
    );
  }

  const handleEdit = (id) => {
    navigate("/lernende/Edit/" + id);
  };

  const handleDelete = (id) => {
    fetch('https://aurelio.undefiniert.ch/tbl_lernende/id_lernende/' + id, {
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
          <th>Name</th>
          <th>Strasse</th>
          <th>Plz</th>
          <th>Ort</th>
          <th>Land</th>
          <th>Geschlecht</th>
          <th>Telefon</th>
          <th>Handy</th>
          <th>Email</th>
          <th>Email Privat</th>
          <th>Birthdate</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id_lernende}>
            <td>{item.id_lernende}</td>
            <td>{item.vorname + " " + item.nachname}</td>
            <td>{item.strasse}</td>
            <td>{item.plz}</td>
            <td>{item.ort}</td>
            <td>{item.nr_land}</td>
            <td>{item.geschlecht}</td>
            <td>{item.telefon}</td>
            <td>{item.handy}</td>
            <td>{item.email}</td>
            <td>{item.email_privat}</td>
            <td>{item.birthdate}</td>
            <td>
              <button onClick={() => handleEdit(item.id_lernende)}>Edit</button>
              <button onClick={() => handleDelete(item.id_lernende)}>Delete</button>
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

export default LernendeTable;
