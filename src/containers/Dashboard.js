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
    }

   useEffect(() => {
        let inputDataArr = Object.values(userInputData)
        let alertMessage = 'Thank you for the feedback.';
        alertMessage += `\r\nYou submitted your response for ${inputDataArr.length} audio ${inputDataArr.length > 1 ? 'files' : 'file'}.`

        if (userFeedback.status === 'success') {
            dispatch(resetFeedback())
            alert(alertMessage);
            // refresh the page after feedback submitted
            window.location.reload(false)
        }
    }, [submitData])

    return (
        <div className="centered-div">
            <p> :::::::: Audio List :::::::: </p>
            {audioList.status === 'loading' && <p>Loading audio list ...</p>}
            {audioList.status === 'idle' && audioList.data.length < 1 && <p>Empty audio list ...</p>}
            {audioList.status === 'idle' && audioList.data.length > 0 && (
                <>
                    {
                        audioList.data.map((audio, index) => {
                            return <AudioAccordian key={index}
                                title={audio.audioId}
                                audioUrl={audio.path}
                                audioId={audio.audioId}
                                onListOptionChange={(inputData) => handleChange(audio.audioId, inputData)} />
                        })
                    }

                    <div className="center">
                        {userFeedback.status === '' && (
                            <button className="button" type="submit" onClick={(e) => submitData(e)}>Submit</button>
                        )}
                        {userFeedback.status === 'saving' && <p>Saving feedback ...</p>}
                        {userFeedback.status === 'success' && <p>Feedback saved</p>}
                    </div>
                </>
            )}
        </div>
    )
}

export default Dashboard;