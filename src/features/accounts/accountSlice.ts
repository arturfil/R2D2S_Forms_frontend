import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import thunk from "redux-thunk";
import agent from "../../helpers/agent";
import { User } from "../../interfaces/User";

interface AccountState {
  user: User | null;
  loggedIn: boolean;
}

const initialState: AccountState = {
  user: null,
  loggedIn: false
};

export const signUpUser = createAsyncThunk<any, Object>(
  "account/signUp",
  async (data, thunkAPI) => {
    try {
      await agent.post("/users", data);
      toast.success("Sucessfuly signed up");
    } catch (error:any) {
      console.log(error);
      return thunkAPI.rejectWithValue({error: error.data});
    }
  }
)

// action (this is the logic you want to perform)
export const loginUser = createAsyncThunk<any, Object>(
  "account/signInUser",
  async (data, thunkAPI) => {
    try {
      const response = await agent.post("/users/login",data);
      const { token } = response.data;
      localStorage.setItem(process.env.REACT_APP_JWT!, JSON.stringify({ token }));
      // thunkAPI.dispatch(fetchCurrentUser());
      thunkAPI.dispatch(setLoggedIn(true));
      toast.success("Succesfuly Loged In");
    } catch (error: any) {
      toast.error("Please check credentials");
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

// fetchCurrentUser - if token provided, this will return the user information
export const fetchCurrentUser = createAsyncThunk<any>(
  'account/fetchCurrentUser',
  async(_,thunkAPI) => {
    try {
      const data = JSON.parse(localStorage.getItem(process.env.REACT_APP_API!)!)
      const response = await agent.get("/users")
      thunkAPI.dispatch(setLoggedIn(true));
      return response.data
    } catch (error:any) {
      setLoggedIn(false);
      return thunkAPI.rejectWithValue({error: error.data});
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
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
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

export const { setUser, logOut, setLoggedIn } = accountSlice.actions;
