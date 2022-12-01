import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
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
            toast.success("Created Poll Succesfully");
            return response.data;
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const getPoll = createAsyncThunk<Poll, string>(
    "poll/getPoll",
    async (id, thunkAPI) => {
        try {
            const response = await agent.get(`/polls/${id}/questions`);
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
        builder.addCase(getPoll.fulfilled, (state, action) => {
            state.singlePoll = action.payload;
        });
    })
});