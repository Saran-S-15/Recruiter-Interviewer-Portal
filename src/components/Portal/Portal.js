import React from 'react'
import { Outlet } from 'react-router-dom';

function Portal() {
  return (
        <div>
            <Outlet></Outlet>
        </div>
  )
}

export default Portal;