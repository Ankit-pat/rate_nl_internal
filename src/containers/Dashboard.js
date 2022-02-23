import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { postUserFeedback } from "../asyncActions/audios";
import { resetFeedback } from "../reducers/audioReducer";
import AudioAccordian from "./components/AudioAccordian";

const Dashboard = () => {
    const [answerCount, setAnswerCount] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showBgMessage, setShowBgMessage] = useState(false)
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
        setAnswerCount(inputDataArr.length);
        // call user feedback put api
        dispatch(postUserFeedback({ userId: userUid, data: inputDataArr }))
    }

    const hidePopup = () => {
        setShowPopup(false)
        setShowBgMessage(true)
        setIsSubmitted(true)
    }

    useEffect(() => {
        if (userFeedback.status === 'success') {
            setShowPopup(true)
            // reset the userfeedback status to initial state
            dispatch(resetFeedback())
        }
    }, [userFeedback])

    return (
        <div className="audio-list">

            {audioList.status === 'loading' && <p>Loading audio list ...</p>}
            {audioList.status === 'idle' && audioList.data.length < 1 && <p>Empty audio list ...</p>}
            {audioList.status === 'idle' && audioList.data.length > 0 && (
                <>
                    {showBgMessage && (
                        <div className="alert alert-success text-center">
                            <h3>Thank you for the feedback!</h3> If you want to give feedback for new audio files, please refresh the page
                        </div>
                    )}

                    <div className={`${isSubmitted === false ? 'show' : 'hide'}`}>
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
                            {isSubmitted === false && userFeedback.status !== 'saving' && (
                                <button className="button" type="submit" onClick={(e) => submitData(e)}>Submit</button>
                            )}
                            {userFeedback.status === 'saving' && (
                                <button className="button" type="button" disabled>Saving feedback ...</button>
                            )}
                        </div>
                    </div>
                </>
            )}

            <div className={`modal ${showPopup && 'show'}`}>
                <div className="modal__header">
                    <h3 className="modal__title">Success...!</h3>
                    <button type="button" className="modal__close" data-dismiss="modal" aria-label="Close" onClick={hidePopup}>
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal__body">
                    Thank you for the feedback! <br />
                    You submitted your response for {answerCount} audio {answerCount > 1 ? 'files' : 'file'}
                </div>
            </div>
            <div className={`modal__backdrop ${showPopup && 'show'}`}></div>
        </div>
    )
}

export default Dashboard;
