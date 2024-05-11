import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
// import config from '..../config/config';
//במקום WEBSITE לשים את הקוד 

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
        // if (!ValidateEmail()) {
        //     return;
        // }

        //${config.PORT}
        //    const foundUser = await fetch(`http://localhost:7787/users?email=${email}`)
        //    .then(async response => await response.json())

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
        const response = await fetch("http://localhost:7787/users", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        });
        const result = await response.json();
        
        if (response == "") {
            setSignUpError('This email already exist, please login');
            return;
        }
        setUser({ id: result.insertId, email: email, password: password });
        navigate('/completeRegisteration', { replace: true });
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