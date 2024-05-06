import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
// import config from '..../config/config';


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
        //${config.PORT}
       // const foundUser = await fetch(`http://localhost:7787/users?email=${email}`)
       const foundUser = await fetch(`http://localhost:7787/users/${email}`)
       .then(async response => await response.json())
        if (foundUser.length != 0) {
            setSignUpError('This email already exist, please choose another one');
            return;
        }
        setUser({ username: email, website: password });
        navigate('/completeRegisteration', { replace: true });
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