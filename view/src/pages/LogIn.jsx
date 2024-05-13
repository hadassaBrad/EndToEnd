
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

        const response = await fetch("http://localhost:7787/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password }),
        }).then(async response => await response.json());

        if (response.ok) {
            localStorage.setItem('currentUser', JSON.stringify(response));
            setUser(response);
            navigate('/home', { replace: true });
        } else {
            console.log(response)
            setLoginError(response);
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



















// import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
// import bcrypt from 'bcryptjs';

// const LogIn = ({ setUser }) => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loginError, setLoginError] = useState('');

//     useEffect(() => {
//         const foundUser = localStorage.getItem("currentUser");
//         if (foundUser != null) {
//             setUser(JSON.parse(foundUser));
//             navigate('/home', { replace: true });
//         }
//     }, []);

//     const handleLogin = async () => {
//         if (!email || !password) {
//             setLoginError('Please fill in all fields.');
//             return;
//         }
//         // const foundUser = await fetch(`http://localhost:7787/users?username=${email}`)
//         const response = await fetch("http://localhost:7787/login", {
//             method: "POST",
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ email: email, password: password }),
//         }).then(async response => await response.json());
//         if (response == 0) {
//             setLoginError("You are not exist in the system, please sign up");
//         }
//         else {
//             localStorage.setItem('currentUser', JSON.stringify(response));
//             setUser(response);
//             navigate('/home', { replace: true });
//         }
//     }
// };

// return (
//     <form className='registerForm'>
//         <h2 className="title">Log in</h2><br />
//         <input type="text" className='input' value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} /><br />
//         <input type="password" className='input' value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} /><br />
//         <button type="button" className="btnOkLogIn" onClick={handleLogin}>Connect</button><br />
//         {loginError && <p className='error' style={{ color: loginError == "Registration successful" ? 'green' : "red" }}>{loginError}</p>}
//         <Link className="goToSignUp" to="/Register">Don't have an account? Createaccount</Link>
//     </form>
// );


// export default LogIn

// // if (foundUser[0].website === password) {
// //     bcrypt.hash(foundUser[0].website, 10, (err, hashedPassword) => {
// //         if (err) {
// //             setLoginError(err);
// //         } else {
// //             const userHidden = {
// //                 ...foundUser[0],
// //                 website: hashedPassword,
// //             };
// //             localStorage.setItem('currentUser', JSON.stringify(userHidden));
// //             setUser(userHidden);
// //         }
// //     });
// //     navigate('/home', { replace: true });
// // }

// // else {
// //     setLoginError("One of details are uncorrect");
// // }
