import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { postUserFeedback } from "../asyncActions/audios";
import {resetFeedback} from "../reducers/audioReducer";
import AudioAccordian from "./components/AudioAccordian";

const Dashboard = () => {
    const audioList = useSelector((state) => state.audio.audioList)
    const userUid = useSelector((state) => state.audio.userUid)
    const userFeedback = useSelector((state) => state.audio.userFeedback)
    const [userInputData, setUserInputData] = useState({})

    const dispatch = useDispatch();

    const handleChange = (audioId, inputData) => {
        inputData.audioId = audioId
        let tempObj = {}
        tempObj[audioId] = inputData
        setUserInputData(Object.assign(userInputData, tempObj))
    }

    const submitData = (event) => {
        event.preventDefault();
        let inputDataArr = Object.values(userInputData)
        // call user feedback put api
        dispatch(postUserFeedback({ userId: userUid, data: inputDataArr }))

        let alertMessage = 'Thank you for the feedback.';
        alertMessage += `\r\nYou submitted your response for ${inputDataArr.length} audio ${inputDataArr.length > 1 ? 'files' : 'file'}.`

        if (userFeedback.status === 'success') {
            alert(alertMessage);
            // refresh the page after feedback submitted
            window.location.reload(false)
        }
    }

    // useEffect(() => {
    //     let inputDataArr = Object.values(userInputData)

    //     let alertMessage = 'Thank you for the feedback.';
    //     alertMessage += `\r\nYou submitted your response for ${inputDataArr.length} audio ${inputDataArr.length > 1 ? 'files' : 'file'}.`

    //     if (userFeedback.status === 'success') {
    //         dispatch(resetFeedback())
    //         alert(alertMessage);
    //         // refresh the page after feedback submitted
    //         window.location.reload(false)
    //     }
    // }, [submitData])

    return (
        <div className="audio-list">
            
            {audioList.status === 'loading' && <p>Loading audio list ...</p>}
            {audioList.status === 'idle' && audioList.data.length < 1 && <p>Empty audio list ...</p>}
            {audioList.status === 'idle' && audioList.data.length > 0 && (
                <>
                    <div class="alert alert-success text-center">
                        <h3>Thank you for the feedback!</h3> If you want to give feedback for new audio files, please refresh the page
                    </div>
                    <div className="show">
                        {
                            audioList.data.map((audio, index) => {
                                return <AudioAccordian key={index}
                                    title={audio.audioId}
                                    audioUrl={audio.path}
                                    audioId={audio.audioId}
                                    onListOptionChange={(inputData) => handleChange(audio.audioId, inputData)} />
                            })
                        }

                        <div className="audio-actions">
                            {userFeedback.status !== 'saving' && (
                                <button className="button" type="submit" onClick={(e) => submitData(e)}>Submit</button>
                            )}
                            {userFeedback.status === 'saving' && <button className="button" type="button" disabled>Saving feedback ...</button>}
                        </div>
                    </div>                    
                </>
            )}

            <div className="modal show">
                <div className="modal__header">
                    <h3 class="modal__title">Success...!</h3>
                    <button type="button" class="modal__close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal__body">Thank you for the feedback! <br />You submitted your response for 4 audio files</div>
            </div>
            <div class="modal__backdrop show"></div>
        </div>
    )
}

export default Dashboard;
