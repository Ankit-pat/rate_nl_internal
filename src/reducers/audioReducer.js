import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { fetchAudioList, postUserFeedback } from '../asyncActions/audios';


const initialState = {
  userUid: uuid(),
  audioList: {
    status: 'idle',
    data: {},
    error: {},
  },
  userFeedback: {
    status: '',
    error: {}
  }
}

export const audioReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetFeedback(state) {
      state.userFeedback.status = ''
    }
  },
  extraReducers: {
    [fetchAudioList.pending]: (state) => {
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
    [postUserFeedback.pending]: (state) => {
      state.userFeedback = {
        status: "saving",
        error: {},
      };
    },
    [postUserFeedback.fulfilled]: (state) => {
      state.userFeedback = {
        status: "success",
        error: {},
      };
    },
    [postUserFeedback.rejected]: (state, action) => {
      state.userFeedback = {
        status: "error",
        error: action.payload,
      };
    },
  },
})

// Action creators are generated for each case reducer function
export const { resetFeedback } = audioReducer.actions

export default audioReducer.reducer