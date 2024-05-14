import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const LogIn = ({ setUser }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
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
        if (!email || !password) {
            setLoginError('Please fill in all fields.');
            return;
        }
        try {
            const response = await fetch("http://localhost:7787/login", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: password }),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);

            } else {
                const result = await response.json();
                const user = { id: result.user_id,
                    lastName: result.lastName,
                    firstName: result.firstName,
                    email: result.email,
                    password: result.password,
                    address: {
                        street: result.street,
                        city: result.city
                            },
                    phone: result.phone }; 
                localStorage.setItem('currentUser', JSON.stringify(user));
                setUser(user); 
                navigate('/home', { replace: true });
            }
        } catch (err) {
            setLoginError(err.message);
        }
    }

    return (
        <form className='registerForm'>
            <h2 className="title">Log in</h2><br />
            <input type="text" className='input' value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} /><br />
            <input type="password" className='input' value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} /><br />
            <button type="button" className="btnOkLogIn" onClick={handleLogin}>Connect</button><br />
            {loginError && <p className='error' style={{ color: loginError == "Registration successful" ? 'green' : "red" }}>{loginError}</p>}
            <Link className="goToSignUp" to="/Register">Don't have an account? Createaccount</Link>
        </form>
    );
}

export default LogIn;