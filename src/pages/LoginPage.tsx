import { ChangeEvent, useState } from "react"
import { User } from "../models/User"

export default function LoginPage() {
    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        password: ""
    });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    function handleLogin(event: ChangeEvent<HTMLFormElement>) {
        event?.preventDefault();
        console.log(user);
    }

    return (
        <div className="container mt-5">
            <form className='form' onSubmit={handleLogin}>
                <h2>Log In</h2>
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
