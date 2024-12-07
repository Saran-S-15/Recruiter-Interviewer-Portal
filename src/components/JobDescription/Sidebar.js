import React from 'react'
import "./JobDescription.css";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function Sidebar({showCandidate}) {
    return (
        <div>
            <div className='yo'>
                <h1 className='mt-3'>
                <PeopleAltIcon className='fs-1 jd' onClick={showCandidate}/>
                </h1>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Sidebar;