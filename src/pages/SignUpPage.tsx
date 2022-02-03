import React, { ChangeEvent, useState } from 'react';

export default function SignUpPage() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [errors, setErros] = useState({});

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    function handleRegister(event: ChangeEvent<HTMLFormElement>) {
        event?.preventDefault();
        console.log(user);
    }

    return (
        <div className="container mt-5">
            <form className='form' onSubmit={handleRegister}>
                <h2>Sign Up</h2>
                <input 
                    name="name"
                    onChange={handleChange}
                    placeholder="name" 
                    type="text" 
                    className="form-control" 
                />
                <input 
                    name="email"
                    onChange={handleChange}
                    placeholder="email" 
                    type="email" 
                    className="form-control" 
                />
                <input 
                    name="password"
                    onChange={handleChange}
                    placeholder="password" 
                    type="password" 
                    className="form-control" 
                />
                <button className="btn btn-outline-dark form-control">Sign Up</button>
            </form>
        </div>
    )
}
