import React, { useState, useEffect } from 'react';
import './table.css';
import { useNavigate } from 'react-router-dom';

const Lerndern_lehrbetrieb_Table = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch('https://aurelio.undefiniert.ch/tbl_lehrbetriebe/all/all', {method: 'GET'})
    .then((response) => response.json())
    .then((datas) => {
      datas.forEach(async element => {
        let lene = [];
        await fetch('https://aurelio.undefiniert.ch/tbl_lehrbetriebe_lernende/nr_lehrbetrieb/' + element.id_lehrbetrieb, {method: 'GET'})
        .then((result) => result.json())
        .then((rel) => {
          rel.forEach(async rell =>{
            await fetch('https://aurelio.undefiniert.ch/tbl_lernende/id_lernende/' + rell.nr_lernende, {method: 'GET'})
              .then((result) => result.json())
              .then((lernender)=> {
                let lernende = lernender[0];
                let temp = {
                  birthdate : lernende.birthdate,
                  email : lernende.email,
                  email_privat: lernende.email_privat,
                  geschlecht: lernende.geschlecht,
                  handy: lernende.handy,
                  id_lernende: lernende.id_lernende,
                  nachname: lernende.nachname,
                  nr_land: lernende.nr_land,
                  ort: lernende.ort,
                  plz: lernende.plz,
                  strasse: lernende.strasse,
                  telefon: lernende.telefon,
                  vorname: lernende.vorname,
                  start: rell.start,
                  ende: rell.ende,
                  beruf: rell.beruf
                }
                lene.push(temp);
              })
            });
          })
          setData((previous) => [...previous, { lehrbetrieb: element, lernende: lene }]);
        });
       })
       .catch((err) => {
          console.log(err.message);
       });
      }, []);

  function DataTable({ data }){
    const [expandedItem, setExpandedItem] = useState(null);
    
    const handleItemClick = (label) => {
      setExpandedItem((prevItem) => (prevItem === label ? null : label));
    };
    console.log(data);
    const addLernender = lehrbetrieb => {
      navigate('/lernende_lehrbetrieb_add/' + lehrbetrieb);
    }
      return (
         <ul className="expandable-list">
           {
           data.map((item) => (

             <li className='sub-list' key={item.lehrbetrieb.id_lehrbetrieb}>
               <div onClick={() => handleItemClick(item.lehrbetrieb.id_lehrbetrieb)} style={{ cursor: 'pointer' }}>
                 {"Firma: " + item.lehrbetrieb.firma + "    "}
                 <button onClick={() => addLernender(item.lehrbetrieb.id_lehrbetrieb)}>Lernender hinzufügen</button>
               </div>
               {expandedItem === item.lehrbetrieb.id_lehrbetrieb && (
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
                     <th>Start</th>
                     <th>Ende</th>
                     <th>Beruf</th>
                   </tr>
                 </thead>
                 <tbody>
                   {item.lernende.map((lernender) => (
                     <tr key={lernender.id_lernende}>
                       <td>{lernender.id_lernende}</td>
                       <td>{lernender.vorname + " " + lernender.nachname}</td>
                       <td>{lernender.strasse}</td>
                       <td>{lernender.plz}</td>
                       <td>{lernender.ort}</td>
                       <td>{lernender.nr_land}</td>
                       <td>{lernender.geschlecht}</td>
                       <td>{lernender.telefon}</td>
                       <td>{lernender.handy}</td>
                       <td>{lernender.email}</td>
                       <td>{lernender.email_privat}</td>
                       <td>{lernender.birthdate}</td>
                       <td>{lernender.start}</td>
                       <td>{lernender.ende}</td>
                       <td>{lernender.beruf}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
               )}
             </li>
           ))}
         </ul>
      );   }; return (
    <div>
      <div className="content">
        <DataTable data={data} />
      </div>
    </div>
  );
}

export default Lerndern_lehrbetrieb_Table;
