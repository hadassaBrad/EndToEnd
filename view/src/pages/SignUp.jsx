import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const SignUp = ({ setUser }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [signUpError, setSignUpError] = useState('');

    const handleRegistration = async () => {
        if (!email || !password || !verifyPassword) {
            setSignUpError('Please fill in all fields.');
            return;
        }
        if (password !== verifyPassword) {
            setSignUpError('The passwords are not the same');
            return;
        }

        const user = {
            lastName: '',
            firstName: '',
            email: email,
            password: password,
            address: {
                street: '',
                city: ''
            },
            phone: ''
        }
        
        try {
            const response = await fetch("http://localhost:7787/users", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
            });
        
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        
            const result = await response.json();
            setUser({ id: result.insertId, email: email, password: password });
            navigate('/completeRegisteration', { replace: true });
          
        } catch (error) {
          
            setSignUpError('This email already exist, please login');
            return;
        }
    }

    const ValidateEmail = () => {
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if ((email).match(mailformat)) {
            return true;
        } else {
            setSignUpError("You have entered an invalid email address!");
            return false;
        }
    }

    return (
        <form className='registerForm'>
            <h2 className="title">Create Account</h2><br />
            <input type="text" className='input' value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} /><br />
            <input type="password" className='input' value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} /><br />
            <input type="password" className='input' value={verifyPassword} placeholder="verify password" onChange={(e) => setVerifyPassword(e.target.value)} /><br />
            <button type="button" className="btnOkSignUp" onClick={handleRegistration}>Connect</button><br />
            {signUpError && <p className='error' style={{ color: signUpError == "Registration successful" ? 'green' : "red" }}>{signUpError}</p>}
            <Link className="goToLogIn" to="/logIn">Already have an account? Sign in</Link>
        </form>
    )
};

export default SignUp;