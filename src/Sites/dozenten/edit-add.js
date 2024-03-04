import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './edit-add.css'
import { useNavigate, useParams } from "react-router-dom";


const DozentAddForm = () => {
    const navigate = useNavigate();
    const [dozentOptions, setDozentOptions] = useState([]);
    const [selectedDozent, setSelectedDozent] = useState(null);
    const [selectedKurs, SetSelectedKurs] = useState(null);
    const [formData, setFormData] = useState({
      vorname: '',
      nachname: '',
      strasse: '',
      plz: '',
      ort: null,
      nr_land: '',
      geschlecht: '',
      telefon: '',
      handy: '',
      email: '',
      brithDate: null,
    });

    useEffect(() => {
      fetch('https://aurelio.undefiniert.ch/tbl_dozent/id_dozent/' + id).then((response) => response.json())
      .then((responseData) => SetSelectedKurs(responseData));
    });

    const { id } = useParams();
    if(id){
      setFormData({
        vorname: selectedKurs.vorname,
        nachname: selectedKurs.nachname,
        strasse: selectedKurs.strasse, 
        plz: selectedKurs.plz, 
        ort: selectedKurs.ort, 
        nr_land: selectedKurs.enddatum, 
        geschlecht: selectedKurs.dauer,
        telefon: selectedKurs.telefon,
        handy: selectedKurs.handy,
        email: selectedKurs.email,
        brithDate: selectedKurs.brithDate, 
      })
    }
  
    useEffect(() => {
      // Fetch and set the list of dozents
      fetch('https://aurelio.undefiniert.ch/countries/all/all')
        .then((response) => response.json())
        .then((länder) => {
          const options = länder.map((land) => ({
            value: land.id_country,
            label: `${land.id_country} - ${land.country}`,
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
        navigate("/kurse");
        console.log('POST request successful:', data);
      })
      .catch((err) => {
        console.error('Error making POST request:', err);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Add Dozent Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Vorname">Vorname:</label>
          <input
            type="text"
            className="form-control"
            id="Vorname"
            onChange={handleChange}
            value={formData.vorname}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nachname">Nachname:</label>
          <input
            type="text"
            className="form-control"
            id="nachname"
            onChange={handleChange}
            value={formData.nachname}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="strasse">Strasse:</label>
          <textarea
            className="form-control"
            id="strasse"
            rows="3"
            onChange={handleChange}
            value={formData.strasse}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="plz">Plz:</label>
          <input
            type="text"
            className="form-control"
            id="plz"
            onChange={handleChange}
            value={formData.plz}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="plz">Plz:</label>
          <input
            type="text"
            className="form-control"
            id="plz"
            onChange={handleChange}
            value={formData.plz}
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
        <label htmlFor="nr_country">Land Nummer:</label>
        <Select
          id="nr_country"
          options={dozentOptions}
          value={selectedDozent}
          onChange={(selectedOption) => setSelectedDozent(selectedOption)}
          isSearchable
          placeholder="Select a Country"
        />
        </div>
        <div className="form-group">
          <label htmlFor="geschlecht">Geschlecht:</label>
          <input
            type="text"
            className="form-control"
            id="geschlecht"
            onChange={handleChange}
            value={formData.geschlecht}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefon">Telefon:</label>
          <input
            type="text"
            className="form-control"
            id="telefon"
            onChange={handleChange}
            value={formData.telefon}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="handy">Handy:</label>
          <input
            type="text"
            className="form-control"
            id="handy"
            onChange={handleChange}
            value={formData.handy}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            className="form-control"
            id="email"
            onChange={handleChange}
            value={formData.email}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthdate">Birthdate:</label>
          <DatePicker
            selected={formData.birthdate}
            onChange={(date) => handleDateChange(date, 'birthdate')}
            dateFormat="yyyy-MM-dd"
            className="form-control"
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

export default DozentAddForm;
