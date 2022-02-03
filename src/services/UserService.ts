import axios from "axios";
import { User } from "../models/User"

export function signUp(user: User) {
    const response = axios.post('http://localhost/api/users/', user);
}