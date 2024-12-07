import React from 'react'
import './Interviewer.css';
import EventIcon from '@mui/icons-material/Event';

function Sidebar2() {
    return (
        <div>
            <div className='ao'>
                <h1 className='mt-3'>
                    <EventIcon sx={{cursor:"pointer"}} className='text-white fs-1 ms-3 mt-4'/>
                </h1>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Sidebar2;