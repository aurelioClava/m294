import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './edit-add.css'

const AddForm = () => {
    const [dozentOptions, setDozentOptions] = useState([]);
    const [selectedDozent, setSelectedDozent] = useState(null);
  
    useEffect(() => {
      // Fetch and set the list of dozents
      fetch('https://aurelio.undefiniert.ch/tbl_dozenten/all/all')
        .then((response) => response.json())
        .then((dozents) => {
          const options = dozents.map((dozent) => ({
            value: dozent.id_dozent,
            label: `${dozent.id_dozent} - ${dozent.vorname} ${dozent.nachname}`,
          }));
          setDozentOptions(options);
        })
        .catch((err) => {
          console.error('Error fetching dozents:', err);
        });
    }, []);

  const [formData, setFormData] = useState({
    kursnummer: '',
    kursthema: '',
    inhalt: '',
    nr_dozent: '',
    startdatum: null,
    enddatum: null,
    dauer: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleDateChange = (date, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: date
    }));
  };

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  const handleSubmit = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append('Content-Type','application/json; charset=UTF-8');
    fetch('https://aurelio.undefiniert.ch/tbl_kurse', {
      method: 'POST',
      headers: myHeaders,
      body: 
`\{
    "kursnummer" : \"${formData.kursnummer}\",
    "kursthema" : \"${formData.kursthema}\",
    "kursinhalt" : \"${formData.inhalt}\",
    "nr_dozent" : ${selectedDozent.value},
    "startdatum" : \"${formatDate(formData.startdatum)}\",
    "enddatum" : \"${formatDate(formData.enddatum)}\",
    "dauer" : \"${formData.dauer}\"
\}`,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data as needed
        console.log('POST request successful:', data);
      })
      .catch((err) => {
        console.error('Error making POST request:', err);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Add Course Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="kursnummer">Kursnummer:</label>
          <input
            type="text"
            className="form-control"
            id="kursnummer"
            onChange={handleChange}
            value={formData.kursnummer}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="kursthema">Kursthema:</label>
          <input
            type="text"
            className="form-control"
            id="kursthema"
            onChange={handleChange}
            value={formData.kursthema}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="inhalt">Inhalt:</label>
          <textarea
            className="form-control"
            id="inhalt"
            rows="3"
            onChange={handleChange}
            value={formData.inhalt}
            required
          />
        </div>
        <div className="form-group">
        <label htmlFor="nr_dozent">Dozent Nummer:</label>
        <Select
          id="nr_dozent"
          options={dozentOptions}
          value={selectedDozent}
          onChange={(selectedOption) => setSelectedDozent(selectedOption)}
          isSearchable
          placeholder="Select a Dozent"
        />
        </div>
        <div className="form-group">
          <label htmlFor="startdatum">Startdatum:</label>
          <DatePicker
            selected={formData.startdatum}
            onChange={(date) => handleDateChange(date, 'startdatum')}
            dateFormat="yyyy-MM-dd"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="enddatum">Enddatum:</label>
          <DatePicker
            selected={formData.enddatum}
            onChange={(date) => handleDateChange(date, 'enddatum')}
            dateFormat="yyyy-MM-dd"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dauer">Dauer:</label>
          <input
            type="text"
            className="form-control"
            id="dauer"
            onChange={handleChange}
            value={formData.dauer}
            required
          />
        </div>
        <a href="/.."><button type="submit" className="btn btn-primary">
          Submit
        </button></a>
      </form>
    </div>
  );
};

export default AddForm;
