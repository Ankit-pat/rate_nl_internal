import React, { useEffect, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
//import UserOptions from "../components/useroptions";
import 'react-h5-audio-player/lib/styles.css';
import "../../styles/useroptions.css"

const AudioAccordian = ({ title, audioUrl, seqNo, onListOptionChange }) => {
    const [isPlayerEnded, SetIsPlayerEnded] = useState(false)
    const [inputData, setInputData] = useState({ audiobility: '', emotion: '' })

    const labelEmotion = "emotion_" + seqNo;
    const labelSound = "sound_" + seqNo;

    const handleChange = (event, labelType) => {
        if (labelType === 'emotion')
            setInputData({
                ...inputData,
                emotion: event.target.value
            })
        else
            setInputData({
                ...inputData,
                audiobility: event.target.value
            })
        
    }
    useEffect(() => {
        console.log(inputData)
       if (inputData.audiobility !== '' && inputData.emotion !== '') onListOptionChange(inputData)
    }, [inputData])

    return (
        <div className="accordion-item">
            <div className="accordion-title">
                <div>{seqNo + 1} {title}</div>
            </div>
            
            <div className="accordion-content">
                <AudioPlayer
                    showJumpControls={false}
                    customAdditionalControls={[]}
                    src={audioUrl}
                    onEnded={e => SetIsPlayerEnded(true)}
                />
                {true && (
                     <div className='user-options'>
                        <div onChange={e => handleChange(e, 'emotion')} >
                            <h5>What emotion do you detect in voice ?</h5>
                            <label className="container">Neutral<input type="radio" value="neutral" name={labelEmotion} />
                                <span className="checkmark"></span>
                            </label>
                            <label className="container">Happy<input type="radio" value="happy" name={labelEmotion}/>
                                <span className="checkmark"></span>
                            </label>
                            <label className="container">Sad<input type="radio" value="sad" name={labelEmotion} />
                                <span className="checkmark"></span>
                            </label>
                            <label className="container">Angry<input type="radio" name={labelEmotion} value="angry" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="container">Fear<input type="radio" name={labelEmotion} value="fear" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="container">Disgust<input type="radio" name={labelEmotion} value="disgust" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="container">Surprise<input type="radio" name={labelEmotion} value="surprise" />
                                <span className="checkmark"></span>
                            </label>
                        </div>

                        <div onChange={e => handleChange(e, 'sound')} >
                            <h5>Is there anything wrong with the sound ?</h5>
                            <label className="container">Yes<input type="radio" name={labelSound} value="false" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="container">No<input type="radio" name={labelSound} value="true" />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AudioAccordian;