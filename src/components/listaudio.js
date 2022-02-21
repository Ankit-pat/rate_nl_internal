import React, { useState } from "react";
import Accordion from "../components/accordian";
import { useSelector } from 'react-redux';

const ListAudio = () => {
    const audioList = useSelector((state) => state.users.audioList)
    const [userInputData, setuserInputData] = useState([])
    
    const handleChange = (audioId, inputData) => {
        inputData.audioId = audioId
        let tempArr = userInputData
        tempArr[audioId] = inputData
        setuserInputData(tempArr)
    }

    const submitData = (event) => {
        event.preventDefault();
        console.log(userInputData)
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
                            return <Accordion key={index}
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

export default ListAudio;