import {BiTrash} from 'react-icons/bi';

const AppointmentInfo = ({appointment, onDeleteAppointment}) => {
    return (
        <li className='py-3 flex items-start md:items-center text-white'>
            <button type="button" onClick={() => onDeleteAppointment(appointment.id)}
            className='p-1.5 mr-2.5 rounded text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
            <BiTrash className='text-2xl' />
            </button>
            <div className='flex-grow'>
                <div className='flex items-center'>
                    <span className='flex-none font-medium text-2xl md:text-3xl drop-shadow'>{appointment.petName}</span>
                </div>
                <div className='font-medium drop-shadow'><b className='text-blue-300 font-normal'>Owner: </b>{appointment.ownerName}</div>
                <div className='block md:hidden leading-tight'>{appointment.aptNotes}</div>
            </div>
            <div className='flex-grow text-center hidden md:block'>
                <div className='leading-tight'>{appointment.aptNotes}</div>
            </div>
            <span className='flex-grow text-right'>{appointment.aptDate}</span>
        </li>
    )
}

export default AppointmentInfo;