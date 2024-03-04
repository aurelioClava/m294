import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './edit-add.css'
import { useNavigate, useParams } from "react-router-dom";


const LehrbetriebeAddForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      firma: '',
      strasse: '',
      plz: '',
      ort: '',
    });
    
    const { id } = useParams();

    useEffect(() => {
      if(id){
        fetch('https://aurelio.undefiniert.ch/tbl_lehrbetriebe/id_lehrbetriebe/' + id).then((response) => response.json())
        .then((responseData) => setFormData(responseData));
      }
    });

    if(id){
      setFormData({
        firma: formData.firma,
        strasse: formData.strasse,
        plz: formData.plz, 
        ort: formData.ort
      })
    }
  
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
    fetch('https://aurelio.undefiniert.ch/tbl_lehrbetriebe', {
      method: 'POST',
      headers: myHeaders,
      body: 
`\{
    "firma" : \"${formData.firma}\",
    "strasse" : \"${formData.strasse}\",
    "plz" : \"${formData.plz}\",
    "ort" : \"${formData.ort}\"
\}`,
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/lehrbetrieb");
        console.log('POST request successful:', data);
      })
      .catch((err) => {
        console.error('Error making POST request:', err);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Add Lehrbetrieb Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firma">Firma:</label>
          <input
            type="text"
            className="form-control"
            id="firma"
            onChange={handleChange}
            value={formData.firma}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="strasse">Strasse:</label>
          <input
            type="text"
            className="form-control"
            id="strasse"
            onChange={handleChange}
            value={formData.strasse}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ort">Ort:</label>
          <input
            type="text"
            className="form-control"
            id="ort"
            onChange={handleChange}
            value={formData.ort}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="plz">PLZ:</label>
          <input
            type="text"
            className="form-control"
            id="plz"
            onChange={handleChange}
            value={formData.plz}
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

export default LehrbetriebeAddForm;
