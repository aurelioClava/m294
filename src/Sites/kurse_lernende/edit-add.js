import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import './edit-add.css'
import { useNavigate, useParams } from "react-router-dom";


const Kurs_lernendeAddForm = () => {
    const navigate = useNavigate();
    const [dozentOptions, setDozentOptions] = useState([]);
    const [selectedDozent, setSelectedDozent] = useState(null);
    const [formData, setFormData] = useState({
      nr_lernende: '',
      note: '',
    });

    const { id } = useParams();
  
    useEffect(() => {
      // Fetch and set the list of dozents
      fetch('https://aurelio.undefiniert.ch/tbl_lernende/all/all')
        .then((response) => response.json())
        .then((lernende) => {
          const options = lernende.map((lernende) => ({
            value: lernende.id_lernende,
            label: `${lernende.id_lernende} - ${lernende.vorname} ${lernende.nachname}`,
          }));
          setDozentOptions(options);
        })
        .catch((err) => {
          console.error('Error fetching dozents:', err);
        });
    }, []);

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
    fetch('https://aurelio.undefiniert.ch/tbl_kurse_lernende', {
      method: 'POST',
      headers: myHeaders,
      body: 
`\{
    "nr_kurs": ${id},
    "nr_lernende" : ${selectedDozent.value},
    "note" : ${formData.note},
\}`,
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/kurse_lernende");
        console.log('POST request successful:', data);
      })
      .catch((err) => {
        console.error('Error making POST request:', err);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Add Lernende Form</h2>
      <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor="nr_lernende">Lernende Nummer:</label>
        <Select
          id="nr_lernende"
          options={dozentOptions}
          value={selectedDozent}
          onChange={(selectedOption) => setSelectedDozent(selectedOption)}
          isSearchable
          placeholder="Select a Lernender"
        />
        </div>
        <div className="form-group">
          <label htmlFor="note">Note:</label>
          <input
            type="text"
            className="form-control"
            id="note"
            onChange={handleChange}
            value={formData.note}
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

export default Kurs_lernendeAddForm;
