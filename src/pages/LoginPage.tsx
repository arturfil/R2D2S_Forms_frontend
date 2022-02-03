import axios from "axios";
import { ChangeEvent, useState } from "react"
import { toast } from "react-toastify";
import { User } from "../models/User"

export default function LoginPage() {
    const LOGIN_URL:string = "http://localhost:8080/api/users/login";
    const [user, setUser] = useState<User>({
        email: "",
        password: "",
    });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    async function handleLogin(event: ChangeEvent<HTMLFormElement>) {
        event?.preventDefault();
        console.log(user);
        try {
            const response = await axios.post(LOGIN_URL, user);
            return response;
        } catch (error:any) {
            toast.error("Please check credentials")         
        }
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
