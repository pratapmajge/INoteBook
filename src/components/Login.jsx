import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate(); // Corrected the typo from 'nevigate' to 'navigate'

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const response = await fetch(`${import.meta.env.VITE_PORT}/api/auth/login`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
    
        const json = await response.json();
        console.log("Login response:", json);  // Added this to check the response
    
        if (json.success) {
            // Ensure the token exists before saving
            if (json.authToken) {
                localStorage.setItem('token', json.authToken);
                console.log("Token saved:", json.authToken);  // This will confirm if the token is saved
            } else {
                console.log("No token received in response");
            }
    
            navigate('/');  // Redirect to homepage/dashboard
            props.showalert("Logged in successfully", "success");
        } else {
            props.showalert("Invalid credentials", "danger");
        }
    };
    

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password' placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary my-2">Submit</button>
            </form>
        </div>
    );
}

export default Login;
