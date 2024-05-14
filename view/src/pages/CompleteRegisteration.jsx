import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

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
        let userHidden;
        if (checkIsNotEmpty() && validatePhone()) {
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
                localStorage.setItem('currentUser', JSON.stringify({ ...userHidden, id: user.id }));
                setUser({ ...userHidden,id:user.id});
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
