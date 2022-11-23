import axios from "axios";
import { User } from "../interfaces/User"

interface JWTData {
    token: string;
}

export const baseURL = process.env.REACT_APP_API_URL;
export const jwt_string:string|undefined = process.env.REACT_APP_JWT

const agent = axios.create({baseURL});

export default agent;