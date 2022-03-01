import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';


const initialState = {
  userUid: uuid(),
  audioList: {
    data: [],
    error: {},
  },
  userFeedback: {
    status: '',
    error: {}
  },
  loading: false
}

export const audioReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetFeedback(state) {
      state.userFeedback.status = ''
    },
    showLoader(state) {
      state.loading = true
      state.audioList.data = []
      state.audioList.error = ''
    },
    saveAudioList(state, action) {
      state.audioList = {
        data: action.payload,
        error: '',
      }
      state.loading = false
    },
    errorAudioList(state, action) {
      state.audioList = {
        error: action.payload,
        data: []
      }
      state.loading = false
    },

    onFeedbackSuccess(state, action) {
      state.userFeedback = {
        status: 'success',
        error: action.payload
      }
    },
    onFeedbackError(state, action) {
      state.userFeedback = {
        status: 'error',
        error: action.payload
      }
    },
    onFeedbackSubmitting(state) {
      state.userFeedback = {
        status: 'saving',
        error: ''
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { resetFeedback, saveAudioList, errorAudioList, showLoader, onFeedbackSuccess, onFeedbackError,  onFeedbackSubmitting} = audioReducer.actions

export default audioReducer.reducer