import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { fetchAudioList, postUserFeedback } from '../asyncActions/audios';


const initialState = {
  userUid: uuid(),
  audioList: {
    status: 'idle',
    data: [{"audioId":"07ouux7bp_1_2_1_2","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F1_2_1_2.wav?alt=media","audioName":"1_2_1_2.wav"},{"audioId":"07ouux7bp_2_1_2_2","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F2_1_2_2.wav?alt=media","audioName":"2_1_2_2.wav"},{"audioId":"07ouux7bp_2_2_1_2","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F2_2_1_2.wav?alt=media","audioName":"2_2_1_2.wav"},{"audioId":"07ouux7bp_1_1_1_2","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F1_1_1_2.wav?alt=media","audioName":"1_1_1_2.wav"},{"audioId":"07ouux7bp_2_2_1_1","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F2_2_1_1.wav?alt=media","audioName":"2_2_1_1.wav"},{"audioId":"07ouux7bp_2_1_1_1","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F2_1_1_1.wav?alt=media","audioName":"2_1_1_1.wav"},{"audioId":"07ouux7bp_2_1_1_2","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F2_1_1_2.wav?alt=media","audioName":"2_1_1_2.wav"},{"audioId":"07ouux7bp_1_2_1_1","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F1_2_1_1.wav?alt=media","audioName":"1_2_1_1.wav"},{"audioId":"07ouux7bp_2_1_2_1","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F2_1_2_1.wav?alt=media","audioName":"2_1_2_1.wav"},{"audioId":"07ouux7bp_2_2_2_1","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F2_2_2_1.wav?alt=media","audioName":"2_2_2_1.wav"},{"audioId":"07ouux7bp_2_2_2_2","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F2_2_2_2.wav?alt=media","audioName":"2_2_2_2.wav"},{"audioId":"07ouux7bp_3_1_1_1","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F3_1_1_1.wav?alt=media","audioName":"3_1_1_1.wav"},{"audioId":"07ouux7bp_3_1_1_2","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F3_1_1_2.wav?alt=media","audioName":"3_1_1_2.wav"},{"audioId":"07ouux7bp_3_1_2_1","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F3_1_2_1.wav?alt=media","audioName":"3_1_2_1.wav"},{"audioId":"07ouux7bp_3_1_2_2","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F3_1_2_2.wav?alt=media","audioName":"3_1_2_2.wav"},{"audioId":"07ouux7bp_3_2_1_1","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F3_2_1_1.wav?alt=media","audioName":"3_2_1_1.wav"},{"audioId":"07ouux7bp_3_2_1_2","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F3_2_1_2.wav?alt=media","audioName":"3_2_1_2.wav"},{"audioId":"07ouux7bp_3_2_2_1","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F3_2_2_1.wav?alt=media","audioName":"3_2_2_1.wav"},{"audioId":"07ouux7bp_3_2_2_2","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F3_2_2_2.wav?alt=media","audioName":"3_2_2_2.wav"},{"audioId":"07ouux7bp_4_1_1_1","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F4_1_1_1.wav?alt=media","audioName":"4_1_1_1.wav"},{"audioId":"07ouux7bp_4_1_1_2","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F4_1_1_2.wav?alt=media","audioName":"4_1_1_2.wav"},{"audioId":"07ouux7bp_4_1_2_1","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F4_1_2_1.wav?alt=media","audioName":"4_1_2_1.wav"},{"audioId":"07ouux7bp_4_1_2_2","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F4_1_2_2.wav?alt=media","audioName":"4_1_2_2.wav"},{"audioId":"07ouux7bp_4_2_1_1","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F4_2_1_1.wav?alt=media","audioName":"4_2_1_1.wav"},{"audioId":"07ouux7bp_4_2_1_2","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F4_2_1_2.wav?alt=media","audioName":"4_2_1_2.wav"},{"audioId":"07ouux7bp_4_2_2_1","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F4_2_2_1.wav?alt=media","audioName":"4_2_2_1.wav"},{"audioId":"07ouux7bp_4_2_2_2","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F4_2_2_2.wav?alt=media","audioName":"4_2_2_2.wav"},{"audioId":"07ouux7bp_5_1_1_1","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F5_1_1_1.wav?alt=media","audioName":"5_1_1_1.wav"},{"audioId":"07ouux7bp_5_1_1_2","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F5_1_1_2.wav?alt=media","audioName":"5_1_1_2.wav"},{"audioId":"07ouux7bp_5_1_2_1","actorName":"07ouux7bp","users":[],"path":"https://firebasestorage.googleapis.com/v0/b/fir-a0f2a.appspot.com/o/RateNL%2F07ouux7bp%2F5_1_2_1.wav?alt=media","audioName":"5_1_2_1.wav"}],
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