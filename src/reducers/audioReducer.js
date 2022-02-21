import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { v4 as uuid } from 'uuid';
import { fetchAudioList } from '../asyncActions/audios';


const initialState = {
  userUid: uuid(),
  audioList: {
    status: 'idle',
    data: {},
    error: {},
  }
}

export const audioReducer = createSlice({
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
export const { setUserId } = audioReducer.actions

export default audioReducer.reducer