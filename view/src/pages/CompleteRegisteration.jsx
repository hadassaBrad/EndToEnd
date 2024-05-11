import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import bcrypt from 'bcryptjs';
//האם זה לא טוב כבר להצפין כאן את הסיסמא?

const CompleteRegisteration = ({ setUser }) => {
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const [completeRegError, setCompleteRegError] = useState('');
    const [formData, setFormData] = useState({
        id: user.id,
        lastName: '',
        firstName: '',
        email: user.email,
        password: user.password,
        address: {
            street: '',
            city: ''
                },
        phone: ''
    });

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user.id);
        let userHidden;
        if (checkIsNotEmpty() && validatePhone()) {
            // bcrypt.hash(formData.password, 10, (err, hashedPassword) => {
            //     if (err) {
            //         setCompleteRegError(err);
            //     } else {
            //         userHidden = {
            //             ...formData,
            //             password: hashedPassword,
            //         };
            //     }
            // });
            userHidden={...formData};
            try {
                const response = await fetch(`http://localhost:7787/users/${user.id}`, {
                    method: "PUT",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userHidden),
                });
                const result = await response.json();
                localStorage.setItem('currentUser', JSON.stringify({ ...userHidden, id: result.id }));
                setUser({ ...userHidden});
            }
            catch (error) {
                setCompleteRegError("Error:", error);
            }
            navigate('/home', { replace: true });
        }
    };

    const validatePhone = () => {
        const phoneNumberRegex = /^[0-9]{10}$/;
        if ((formData.phone).match(phoneNumberRegex)) {
            return true;
        }
        else {
            setCompleteRegError("You have entered an invalid phone number!");
            return false;
        }
    }

    const checkIsNotEmpty = () => {
        if (!formData.firstName ||!formData.lastName || !formData.email || !formData.address.city ||!formData.address.street || !formData.phone ) {
            setCompleteRegError("One or more of the details are empty");
            return;
        }
        return true;
    }

    return (
        <div className='completeRegisteration'>
            <h1>Complete Registeration</h1>
            <form >
                <h3>Private Details:</h3>
                <label>
                    First Name:
                    <input type="text" className='input' value={formData.firstName} onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))} />
                </label>
                <br />

                <h3>Private Details:</h3>
                <label>
                    Last Name:
                    <input type="text" className='input' value={formData.lastName} onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))} />
                </label>
                <br />

                <label>
                    Email:
                    <input className='input disable' type="email" name="email" disabled={true} value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} />
                </label>
                <br />
                <label>
                    Phone:
                    <input className='input' type="tel" name="phone" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} />
                </label>
                <br />
                <label>
                    Password:
                    <input className='input disable' type="password" name="password" disabled={true} value={user.password} />
                </label>
                <br />

                <label>
                    Street:
                    <input className='input' type="text" name="street" value={formData.address.street} onChange={(e) => setFormData(prev => ({ ...prev, address: ({ ...prev.address, street: e.target.value }) }))} />
                </label>
               
                <br />
                <label>
                    City:
                    <input className='input' type="text" name="city" value={formData.address.city} onChange={(e) => setFormData(prev => ({ ...prev, address: ({ ...prev.address, city: e.target.value }) }))} />
                </label>
                <br />
          
                {completeRegError && <p className='error' style={{ color: completeRegError == "Registration successful" ? 'green' : "red" }}>{completeRegError}</p>}
                <button className="btnOkCompleteRegisteragation" type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
            </form>
        </div>
    )
}

export default CompleteRegisteration

























// import React, { useState, useContext } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../App';
// import bcrypt from 'bcryptjs';
// //האם זה לא טוב כבר להצפין כאן את הסיסמא?

// const CompleteRegisteration = ({ setUser }) => {
//     const user = useContext(UserContext);
//     const navigate = useNavigate();
//     const [completeRegError, setCompleteRegError] = useState('');
//     const [formData, setFormData] = useState({
//         id: '',
//         name: '',
//         username: user.username,
//         email: '',
//         address: {
//             street: '',
//             suite: '',
//             city: '',
//             zipcode: '',
//             geo: {
//                 lat: '',
//                 lng: ''
//             }
//         },
//         phone: '',
//         website: user.website,
//         company: {
//             name: '',
//             catchPhrase: '',
//             bs: ''
//         }
//     });

//     const handleSubmit = async (e) => {
//         let userHidden;
//         e.preventDefault();
//         if (checkIsNotEmpty() && ValidateEmail() && validatePhone()) {
//             bcrypt.hash(formData.website, 10, (err, hashedPassword) => {
//                 if (err) {
//                     setCompleteRegError(err);
//                 } else {
//                     userHidden = {
//                         ...formData,
//                         website: hashedPassword,
//                     };
//                 }
//             });
//             try {
//                 const response = await fetch("http://localhost:7787/users", {
//                     method: "POST",
//                     headers: {
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(formData),
//                 });
//                 const result = await response.json();
//                // localStorage.setItem('currentUser', JSON.stringify({ ...userHidden, id: result.id }));
//                 setUser({ ...userHidden, id: result.id });
//             }
//             catch (error) {
//                 setCompleteRegError("Error:", error);
//             }
//             navigate('/home', { replace: true });
//         }
//     };

//     const ValidateEmail = () => {
//         let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//         if ((formData.email).match(mailformat)) {
//             return true;
//         } else {
//             setCompleteRegError("You have entered an invalid email address!");
//             return false;
//         }
//     }

//     const validatePhone = () => {
//         const phoneNumberRegex = /^[0-9]{10}$/;
//         if ((formData.phone).match(phoneNumberRegex)) {
//             return true;
//         }
//         else {
//             setCompleteRegError("You have entered an invalid phone number!");
//             return false;
//         }
//     }

//     const checkIsNotEmpty = () => {
//         if (!formData.name || !formData.email || !formData.address.street || !formData.address.zipcode ||
//             !formData.phone || !formData.company.name || !formData.company.catchPhrase || !formData.company.bs) {
//             setCompleteRegError("One or more of the details are empty");
//             return;
//         }
//         return true;
//     }

//     return (
//         <div className='completeRegisteration'>
//             <h1>Complete Registeration</h1>
//             <form >
//                 <h3>Private Details:</h3>
//                 <label>
//                     Name:
//                     <input type="text" className='input' value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} />
//                 </label>
//                 {/* <br />
//                 <label>
//                     Username:
//                     <input className='input disable' type="text" name="username" disabled={true} value={user.username} />
//                 </label> */}
//                 <br />
//                 <label>
//                     Email:
//                     <input className='input' type="email" name="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} />
//                 </label>
//                 <br />
//                 <label>
//                     Phone:
//                     <input className='input' type="tel" name="phone" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} />
//                 </label>
//                 <br />
//                 <label>
//                     Password:
//                     <input className='input disable' type="password" name="website" disabled={true} value={user.website} />
//                 </label>
//                 <br />

//                 <label>
//                     Street:
//                     <input className='input' type="text" name="street" value={formData.address.street} onChange={(e) => setFormData(prev => ({ ...prev, address: ({ ...prev.address, street: e.target.value }) }))} />
//                 </label>
//                 {/* <br />
//                 <label>
//                     Suite:
//                     <input className='input' type="text" name="suite" value={formData.address.suite} onChange={(e) => setFormData(prev => ({ ...prev, address: ({ ...prev.address, suite: e.target.value }) }))} />
//                 </label> */}
//                 <br />
//                 <label>
//                     City:
//                     <input className='input' type="text" name="city" value={formData.address.city} onChange={(e) => setFormData(prev => ({ ...prev, address: ({ ...prev.address, city: e.target.value }) }))} />
//                 </label>
//                 <br />
//                 {/* <label>
//                     Zipcode:
//                     <input className='input' type="text" name="zipcode" value={formData.address.zipcode} onChange={(e) => setFormData(prev => ({ ...prev, address: ({ ...prev.address, zipcode: e.target.value }) }))} />
//                 </label>
//                 <br /> */}

//                 {/* <h3>Geo:</h3>
//                 <label>
//                     Latitude:
//                     <input className='input' type="text" name="lat" value={formData.address.geo.lat} onChange={(e) => setFormData(prev => ({ ...prev, address: ({ ...prev.address, geo: ({ ...prev.address.geo, lat: e.target.value }) }) }))} />
//                 </label>
//                 <br />
//                 <label>
//                     Longitude:
//                     <input className='input' type="text" name="lng" value={formData.address.geo.lng} onChange={(e) => setFormData(prev => ({ ...prev, address: ({ ...prev.address, geo: ({ ...prev.address.geo, lng: e.target.value }) }) }))} />
//                 </label>
//                 <br /> */}

// {/* 
//                 <h3>Company:</h3>
//                 <label>
//                     Company Name:
//                     <input className='input' type="text" name="name" value={formData.company.name} onChange={(e) => setFormData(prev => ({ ...prev, company: ({ ...prev.company, name: e.target.value }) }))} />
//                 </label>
//                 <br />
//                 <label>
//                     Catch Phrase:
//                     <input className='input' type="text" name="catchPhrase" value={formData.company.catchPhrase} onChange={(e) => setFormData(prev => ({ ...prev, company: ({ ...prev.company, catchPhrase: e.target.value }) }))} />
//                 </label>
//                 <br />
//                 <label>
//                     BS:
//                     <input className='input' type="text" name="bs" value={formData.company.bs} onChange={(e) => setFormData(prev => ({ ...prev, company: ({ ...prev.company, bs: e.target.value }) }))} />
//                 </label>
//                 <br /> */}
//                 {completeRegError && <p className='error' style={{ color: completeRegError == "Registration successful" ? 'green' : "red" }}>{completeRegError}</p>}
//                 <button className="btnOkCompleteRegisteragation" type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
//             </form>
//         </div>
//     )
// }

// export default CompleteRegisteration