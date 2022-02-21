import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../utils/api";

export const fetchAudioList = createAsyncThunk(
    "user/fetchAudioList",
    (userId) =>
      instance
        .get(`/${userId}`)
        .then((response) => response.data)
        .catch((error) => error)
  );



export const postUserFeedback  = createAsyncThunk(
    "user/postUserFeedback",
    ({userId, data}) => {
      return instance
        .put(`/updateStatus/${userId}`, data )
        .then((response) => response.data)
        .catch((error) => error)
    }
  );