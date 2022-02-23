import React, { useEffect, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import musicIcon from './../../images/music-icon.png';

const AudioAccordian = ({ title, audioUrl, audioId, onListOptionChange }) => {
    const [isPlayerEnded, SetIsPlayerEnded] = useState(false)
    const [inputData, setInputData] = useState({ audiobility: '', emotion: '' })

    const labelEmotion = "emotion_" + audioId;
    const labelSound = "sound_" + audioId;

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
        if (inputData.audiobility !== '' || inputData.emotion !== '')
            onListOptionChange(inputData)
    }, [inputData])

    return (
        <div className="accordion-item">
            {/* <div className="accordion-title">
                <div></div>
            </div> */}

            <div className="accordion-content">
                <div className='audio'>
                    <div className='audio__icon'><img src={musicIcon} alt="Audio Icon" /></div>
                    <div className='audio__info'>
                        <div className='audio__title'>{title}</div>
                        <AudioPlayer
                            showJumpControls={false}
                            customProgressBarSection={[]}
                            customVolumeControls={[]}
                            customAdditionalControls={[]}
                            src={audioUrl}
                            onEnded={e => SetIsPlayerEnded(true)}
                        />
                    </div>
                </div>

                {isPlayerEnded && (
                    <div className='user-options'>
                        <div onChange={e => handleChange(e, 'emotion')} >
                            <h5 className="user-options__title">What emotion do you detect in voice ?</h5>
                            <label className="checkmark-container">Neutral<input type="radio" value="neutral" name={labelEmotion} />
                                <span className="checkmark"></span>
                            </label>
                            <label className="checkmark-container">Happy<input type="radio" value="happy" name={labelEmotion} />
                                <span className="checkmark"></span>
                            </label>
                            <label className="checkmark-container">Sad<input type="radio" value="sad" name={labelEmotion} />
                                <span className="checkmark"></span>
                            </label>
                            <label className="checkmark-container">Angry<input type="radio" name={labelEmotion} value="angry" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="checkmark-container">Fear<input type="radio" name={labelEmotion} value="fear" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="checkmark-container">Disgust<input type="radio" name={labelEmotion} value="disgust" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="checkmark-container">Surprise<input type="radio" name={labelEmotion} value="surprise" />
                                <span className="checkmark"></span>
                            </label>
                        </div>

                        <div onChange={e => handleChange(e, 'sound')} >
                            <h5 className="user-options__title">Is there anything wrong with the sound ?</h5>
                            <label className="checkmark-container">Yes<input type="radio" name={labelSound} value="true" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="checkmark-container">No<input type="radio" name={labelSound} value="false" />
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
