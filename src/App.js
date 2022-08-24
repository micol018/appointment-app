import { useState, useEffect, useCallback } from 'react';

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



  const fetchData = useCallback(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(data => {
        setAppointmentList(data)
      })
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
      <div className="App container mx-auto mt-3 mb-3 px-2">
        <h1 className="text-5xl my-5 font-light text-center"><IoPaw className="inline-block text-amber-400 text-4xl align-middle" /> Vet Clinic Appointments <IoPaw className="inline-block text-amber-400 text-4xl align-middle" /></h1>
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
