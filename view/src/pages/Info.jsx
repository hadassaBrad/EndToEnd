import React, { useContext } from 'react'
import { UserContext } from '../App';

const Info = () => {
  const user = useContext(UserContext);
  return (
    <div className='info'>
      <div>
        <h3>User Details</h3>
        <p>First Name: {user.firstName}</p>
        <p>Last Name: {user.lastName}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
      </div>
      <div>
        <h3>Address</h3>
        <p>Street: {user.address.street}</p>
        <p>City: {user.address.city}</p>
      </div>
      
    </div>

  )
}

export default Info