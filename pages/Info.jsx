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


// const Info = () => {
//   const user = useContext(UserContext);
//   return (
//     <div className='info'>
//       <div>
//         <h3>User Details</h3>
//         <p>Name: {user.name}</p>
//         <p>Username: {user.username}</p>
//         <p>Email: {user.email}</p>
//         <p>Phone: {user.phone}</p>
//       </div>
//       <div>
//         <h3>Address</h3>
//         <p>Street: {user.address.street}</p>
//         <p>Suite: {user.address.suite}</p>
//         <p>City: {user.address.city}</p>
//         <p>Zipcode: {user.address.zipcode}</p>

//         <h4>Geo Location:</h4>
//         <p>Lat: {user.address.geo.lat}</p>
//         <p>Lng: {user.address.geo.lng}</p>
//       </div>
//       <div>
//         <h3>Company</h3>
//         <p>Company Name: {user.company.name}</p>
//         <p>Catch Phrase: {user.company.catchPhrase}</p>
//         <p>BS: {user.company.bs}</p>
//       </div>
//     </div>

//   )
// }