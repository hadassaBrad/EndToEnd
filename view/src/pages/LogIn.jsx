import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const LogIn = ({ setUser }) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        const foundUser = localStorage.getItem("currentUser");
        if (foundUser != null) {
            setUser(JSON.parse(foundUser));
            navigate('/home', { replace: true });
        }
    }, []);

    const handleLogin = async () => {
        if (!userName || !password) {
            setLoginError('Please fill in all fields.');
            return;
        }
        const foundUser = await fetch(`http://localhost:7787/users?username=${userName}`)
            .then(async response => await response.json());
        if (foundUser.length == 0) {
            setLoginError("You are not exist in the system, please sign up");
        }
        else {
            if (foundUser[0].website === password) {
                bcrypt.hash(foundUser[0].website, 10, (err, hashedPassword) => {
                    if (err) {
                        setLoginError(err);
                    } else {
                        const userHidden = {
                            ...foundUser[0],
                            website: hashedPassword,
                        };
                        localStorage.setItem('currentUser', JSON.stringify(userHidden));
                        setUser(userHidden);
                    }
                });
                navigate('/home', { replace: true });
            }
            else {
                setLoginError("One of details are uncorrect");
            }
        }
    };

    return (
        <form className='registerForm'>
            <h2 className="title">Log in</h2><br />
            <input type="text" className='input' value={userName} placeholder="user name" onChange={(e) => setUserName(e.target.value)} /><br />
            <input type="password" className='input' value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} /><br />
            <button type="button" className="btnOkLogIn" onClick={handleLogin}>Connect</button><br />
            {loginError && <p className='error' style={{ color: loginError == "Registration successful" ? 'green' : "red" }}>{loginError}</p>}
            <Link className="goToSignUp" to="/Register">Don't have an account? Createaccount</Link>
        </form>
    );
}
export default LogIn