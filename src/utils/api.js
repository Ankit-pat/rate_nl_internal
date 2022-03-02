import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://us-central1-vess-labeling-app.cloudfunctions.net/audios'
  });
  