import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { User } from "../models/User";
import { useAppDispatch } from "../store/configurationStore";
import { loginUser } from "../store/slices/accountSlice";

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        email: "",
        password: "",
    });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    }

    async function handleLogin(event: ChangeEvent<HTMLFormElement> ,user: any) {
        event?.preventDefault();
        try {
            await dispatch(loginUser(user));
            navigate("/")
        } catch (error) {
            console.error("WAaaaaaa!")
            toast.error("Please check credentials")
        }
    }

    return (
        <div className="container mt-5">
            <form className="form" onSubmit={(e:ChangeEvent<HTMLFormElement>) => handleLogin(e, user)}>
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
                <button className="btn btn-outline-dark form-control">
                    Sign Up
                </button>
            </form>
        </div>
    );
}
