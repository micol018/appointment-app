import { useState, useEffect } from 'react';

import { IoPaw } from "react-icons/io5";
import './App.css';


import AddAppointment from './components/AddAppointment';
import Search from './components/Search';
import AppointmentInfo from './components/AppointmentInfo';
import Footer from './components/Footer';

function App() {

  let [appointmentList, setAppointmentList] = useState([]);
  let [query, setQuery] = useState('');
  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");

  const filteredAppointment = appointmentList.filter(
    item => {
      return (
        item.petName.toLowerCase().includes(query.toLocaleLowerCase()) || 
        item.ownerName.toLowerCase().includes(query.toLocaleLowerCase()) || 
        item.aptNotes.toLowerCase().includes(query.toLocaleLowerCase())
      )
    }
  ).sort((a, b) => {
    let order = (orderBy === "asc") ? 1 : -1;
    return (
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? -1 * order : 1 * order
    )
  })



  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/data.json');
        if (response.ok) {
          const data = await response.json();
          setAppointmentList(data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="App mx-3 md:mx-5 lg:mx-10 mt-3 md:mt-5 lg:mt-10 mb-3 px-2">
        <h1 className="text-2xl md:text-5xl my-5 text-center text-white"><IoPaw className="inline-block text-blue-400 text-2xl md:text-4xl align-middle" /> Vet Clinic Appointments <IoPaw className="inline-block text-blue-400 text-2xl md:text-4xl align-middle" /></h1>
        <AddAppointment 
        onSendAppointment={myAppointment => setAppointmentList([...appointmentList, myAppointment])}
        lastId={appointmentList.reduce((max, item) => Number(item.id) > max ? Number(item.id) : max, 0)}
        />
        <Search query={query} onQueryChange={myQuery => setQuery(myQuery)} 
        orderBy={orderBy} 
        onOrderByChange={mySort => setOrderBy(mySort)} 
        sortBy={sortBy} 
        onSortByChange={mySort => setSortBy(mySort)}
        />

        <ul className='divide-y divide-gray-200'>
          {filteredAppointment
            .map(appointment => (
              <AppointmentInfo key={appointment.id} appointment={appointment}
              onDeleteAppointment={
                appointmentId => setAppointmentList(appointmentList.filter(appointment => appointment.id !== appointmentId))
              }/>
            ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default App;
