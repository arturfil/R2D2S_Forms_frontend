import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { User } from "../../models/User";


interface AccountState {
    user: User | null;
}

const initialState: AccountState = {
    user: null
}

export const loginUser = createAsyncThunk<any, User>(
    'account/signInUser',
    async (data, thunkAPI) => {
      try {
        const response = await axios.post("http://localhost:8080/api/users/login", data);
        const { token } = response.data;
        localStorage.setItem('jwtforms', JSON.stringify({token}));
        toast.success("Succesfuly Loged In");
      } catch (error: any) {
        toast.error("Please check credentials")
        return thunkAPI.rejectWithValue({error: error.data})
      }
    }
  )

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = {...action.payload}
            console.log(action.payload)
        }
    }
})

export const { setUser } = accountSlice.actions;