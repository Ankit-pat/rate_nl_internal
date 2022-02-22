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
    [postUserFeedback.fulfilled]: (state, action) => {
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
export const { setUserId } = audioReducer.actions

export default audioReducer.reducer