import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../helpers/agent";
import { Poll } from "../../interfaces/Poll";

interface PollState {
    polls: Poll[] | null;
    singlePoll: Poll | null;
}

const initialState:PollState = {
    polls: null,
    singlePoll: null
}

export const createPoll = createAsyncThunk<Poll, any>(
    "poll/createPoll",
    async (data, thunkAPI) => {
        try {
            const response = await agent.post("/polls", data);
            return response.data;
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const pollSlice = createSlice({
    name: "poll",
    initialState,
    reducers: {

    }, 
    extraReducers: (builder => {
       
    })
});