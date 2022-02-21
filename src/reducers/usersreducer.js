import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { v4 as uuid } from 'uuid';

export const fetchAudioList = createAsyncThunk(
  "user/fetchAudioList",
  (userId) =>
    axios
      .get(`http://localhost:5001/fir-a0f2a/us-central1/audios/${userId}`)
      .then((response) => response.data)
      .catch((error) => error)
);

const initialState = {
  userUid: uuid(),
  audioList: {
    status: 'idle',
    data: {},
    error: {},
  }
}

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userUid = action.payload
    },
  },
  extraReducers: {
    [fetchAudioList.pending]: (state, action) => {
      state.audioList = {
        status: "loading",
        data: {},
        error: {},
      };
    },
    [fetchAudioList.fulfilled]: (state, action) => {
      state.audioList = {
        status: "idle",
        data: action.payload,
        error: {},
      };
    },
    [fetchAudioList.rejected]: (state, action) => {
      state.audioList = {
        status: "idle",
        data: {},
        error: action.payload,
      };
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserId } = userReducer.actions

export default userReducer.reducer