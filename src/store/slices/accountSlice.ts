import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import thunk from "redux-thunk";
import { User } from "../../models/User";

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};

// action (this is the logic you want to perform)
export const loginUser = createAsyncThunk<any, Object>(
  "account/signInUser",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        data
      );
      const { token } = response.data;
      localStorage.setItem("jwtforms", JSON.stringify({ token }));
      toast.success("Succesfuly Loged In");
    } catch (error: any) {
      toast.error("Please check credentials");
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<any>(
  'account/fetchCurrentUser',
  async(_,thunkAPI) => {
    try {
      const data = JSON.parse(localStorage.getItem('jwtforms')!)
      const { token } = data;
      const response = await axios.get(
        "http://localhost:8080/api/users", {
          headers: {'Authorization': `Bearer ${token}`}
        }
      )
      return response.data
    } catch (error) {
      
    }
  }
)

// slice has a 'slice' of the app state => you manage state changes
export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = {email: '', password: '', authenticated: true};
      console.log(action.payload);
    },
    logOut: (state) => {
      state.user = null;
      localStorage.removeItem('jwtforms');
    },
  },
  extraReducers: (builder => {
    builder.addMatcher(isAnyOf(loginUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
      state.user = {...action.payload}
    })
  })
});

export const { setUser, logOut } = accountSlice.actions;
