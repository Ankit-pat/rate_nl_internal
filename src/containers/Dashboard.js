import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { postUserFeedback } from "../asyncActions/audios";
import { resetFeedback } from "../reducers/audioReducer";
import AudioAccordian from "./components/AudioAccordian";

const Dashboard = () => {
    const [answerCount, setAnswerCount] = useState( 0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const audioList = useSelector((state) => state.audio.audioList)
    const loading = useSelector((state) => state.audio.loading)
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
        setShowSuccessMessage(true)
        setIsSubmitted(true)
    }

    useEffect(() => {
        if (userFeedback.status === 'success') {
            setShowPopup(true)
            // reset the userfeedback status to initial state
            dispatch(resetFeedback())
        } else if (userFeedback.status === 'error') {
            alert(userFeedback.error)
            dispatch(resetFeedback())

        }
    }, [userFeedback, dispatch])

    return (
        <div className="audio-list">

            {loading && <div className="loading">
                <img alt="" style={{ width: 200, height: 200 }} src={require('../images/loading.gif')} />
            </div>}
            {!loading && audioList.data.length < 1 && <p>There is no audio to show here.</p>}
            {!loading && audioList.data.length > 0 && (
                <>
                    {showSuccessMessage && (
                        <div className="alert alert-success text-center">
                            <p>
                                <h3>Thank you for the feedback!</h3> If you want to give feedback for new audio files, please refresh the page
                            </p>
                            <button type="button" className="modal__close" data-dismiss="modal" aria-label="Close" onClick={() => window.location.reload()}>
                                <span aria-hidden="true">Reload/Refresh</span>
                            </button>
                        </div>
                    )}

                   {!isSubmitted &&  <div>
                        {
                            audioList.data.map((audio, index) => {
                                return <AudioAccordian key={index}
                                    audioUrl={audio.path}
                                    audioId={audio.audioId}
                                    onListOptionChange={(inputData) => handleChange(audio.audioId, inputData)} />
                            })
                        }

                        <div className="audio-actions">
                            {userFeedback.status !== 'saving' && (
                                <button className="button" type="submit" onClick={(e) => submitData(e)}>Submit</button>
                            )}
                            {userFeedback.status === 'saving' && (
                                <button className="button" type="button" disabled>Saving feedback ...</button>
                            )}
                        </div>
                    </div>}
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
            <div className={`modal__backdrop ${showPopup && 'show'}`} onClick={hidePopup}></div>
        </div>
    )
}

export default Dashboard;
