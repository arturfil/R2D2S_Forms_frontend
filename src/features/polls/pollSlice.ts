import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import agent from "../../helpers/agent";
import { Poll, PollReply, PollResults, QueryParameters, Response } from "../../interfaces/Poll";

interface PollState {
    polls: Poll[] | null;
    singlePoll: Poll | null;
    loading: boolean;
    pollResults: PollResults | null;
}

const initialState:PollState = {
    polls: null,
    singlePoll: null,
    loading: false,
    pollResults: null
}

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
);

export const getPolls = createAsyncThunk<Poll[], QueryParameters>(
    "poll/getPolls",
    async (obj, thunkAPI) => {
        const { page, limit } = obj;
        try {
            const response = await agent.get(`/polls?page=${page}&limit${limit}`);
            return response.data.polls;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const getPollResults = createAsyncThunk<PollResults, string>(
    "poll/getPollResutls",
    async (id, thunkAPI) => {
        try {
            const response = await agent.get(`/polls/${id}/results`);
            return response.data;
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

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
);

export const replyPoll = createAsyncThunk<any, Response>(
    "poll/replyPoll",
    async (data, thunkAPI) => {
        try {
            const response = await agent.post(`polls/reply`, data);
            toast.success("Successfully Submited Reply");
            return response.data;
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const togglePoll = createAsyncThunk<string, string>(
    "poll/togglePoll",
    async (pollId, thunkAPI) => {
        try {
            const response = await agent.patch(`/polls/${pollId}`);
            thunkAPI.dispatch(getPolls({page:0, limit: 6}));
            return response.data;
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const deletePoll = createAsyncThunk<string, any>(
    "poll/deletePoll",
    async (pollId, thunkAPI) => {
        try {
            const response = await agent.delete(`/polls/${pollId}`);
            thunkAPI.dispatch(getPolls({page:0, limit: 6}));
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
        builder.addCase(getPolls.fulfilled, (state, action) => {
            state.polls = action.payload;
        });
        builder.addCase(getPollResults.fulfilled, (state, action) => {
            state.pollResults = action.payload;
        })
        builder.addCase(togglePoll.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(togglePoll.fulfilled, (state, action) => {
            state.loading = false;
        });
    })
});