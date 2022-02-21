import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { postUserFeedback } from "../asyncActions/audios";
import AudioAccordian from "./components/AudioAccordian";

const Dashboard = () => {
    const audioList = useSelector((state) => state.audio.audioList)
    const [userInputData, setUserInputData] = useState([])
    const userUid = useSelector((state) => state.audio.userUid)

    const dispatch = useDispatch();

    const handleChange = (audioId, inputData) => {
        inputData.audioId = audioId
        inputData.audiobility = inputData.audiobility === 'true'
        setUserInputData([...userInputData.concat([inputData])])
    }

    const submitData = (event) => {
        event.preventDefault();
        dispatch(postUserFeedback({userId: userUid ,data: userInputData}))
    }

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
                                seqNo={index}
                                onListOptionChange={(inputData) => handleChange(audio.audioId, inputData)} />
                        })
                    }
                    <div className="center">
                        <button className="button" type="submit" onClick={(e) => submitData(e)}>Submit</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Dashboard;