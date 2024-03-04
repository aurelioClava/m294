import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './edit-add.css'
import { useNavigate, useParams } from "react-router-dom";


const LänderAddForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({land: ''});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append('Content-Type','application/json; charset=UTF-8');
    fetch('https://aurelio.undefiniert.ch/tbl_countries', {
      method: 'POST',
      headers: myHeaders,
      body: 
`\{
  "country" : \"${formData.land}\"
\}`,
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/Länder");
        console.log('POST request successful:', data);
      })
      .catch((err) => {
        console.error('Error making POST request:', err);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Add Country Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="land">Land:</label>
          <input
            type="text"
            className="form-control"
            id="land"
            onChange={handleChange}
            value={formData.land}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LänderAddForm;
