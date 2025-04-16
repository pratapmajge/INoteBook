import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup(props) {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const nevigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        // fetch("localhost:5000/api/auth/login")
        const { name, email, password } = credentials
        const response = await fetch(`${import.meta.env.VITE_PORT}/api/auth/createuser`, {

            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ name , email, password })

        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            //redirect
            localStorage.setItem('token', json.authToken)
            nevigate('/')
            props.showalert("Account created successfully" , "success")

        }
        else {
            props.showalert("Invalid credentials" , "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container m-2'>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-2">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onChange} placeholder="Enter name" />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' onChange={onChange} className="form-control" id="password" placeholder="Password" required minLength={5} />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" name='cpassword' onChange={onChange} className="form-control" id="cpassword" placeholder="Confirm Password" required minLength={5} />
                </div>

                <button type="submit" className="btn btn-primary my-2">Submit</button>
            </form>
        </div>
    )
}

export default Signup
