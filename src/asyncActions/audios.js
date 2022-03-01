import { errorAudioList, onFeedbackError, onFeedbackSubmitting, onFeedbackSuccess, saveAudioList, showLoader } from "../reducers/audioReducer";
import { instance } from "../utils/api";


export const fetchAudioList = (userId) =>
  async (dispatch) => {
    try {
      dispatch(showLoader())
      const response = await instance
        .get(`/${userId}`)
      dispatch(saveAudioList(response.data))
    } catch (e) {
      dispatch(errorAudioList(e.message))
    }
  }


export const postUserFeedback = ({ userId, data }) =>
  async (dispatch) => {
    try {
      dispatch(onFeedbackSubmitting())
      const response = await instance
        .put(`/updateStatus/${userId}`, data)
      dispatch(onFeedbackSuccess(response.data))
    } catch (e) {
      dispatch(onFeedbackError(e.message))
    }
  }