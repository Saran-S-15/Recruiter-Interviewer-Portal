import React from 'react';
import "./JobDescription.css";
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import { useNavigate } from 'react-router-dom';

function Topbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/", { replace: true });
    };

    return (
        <div className='container-fluid topbar'>
            <div className='row'>
                <div className='col-lg-2'>
                    <h3 className="recrutify text-white">Recrutify</h3>
                </div>
                <div className='col-lg-10 d-flex justify-content-end'>
                    <button onClick={handleLogout} className=' btn btn-outline-light mt-2'>
                        <LogoutSharpIcon />
                        <span className='ms-2'>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Topbar;
