import React, { BaseSyntheticEvent, ChangeEvent, SyntheticEvent, useContext, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faAngleLeft,
    faAngleRight,
    faPause,
} from "@fortawesome/free-solid-svg-icons";
import { AppContext } from '../context/AppContext'
const Player: React.FC = () => {
    const {
        listSong, currentSong,
        handleChangCurrentSong
    } = useContext(AppContext)
    const audioRef = useRef<HTMLAudioElement>(null);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    });
    const [isPlaySong, setIsPlaySong] = useState(false);

    const timeUpdateHandler = (e: SyntheticEvent<HTMLAudioElement>) => {
        const {
            target: { currentTime, duration },
        } = e as BaseSyntheticEvent

        const roundedCurrentTime = Math.round(currentTime);
        const roundedDuration = Math.round(duration);
        const animationPercent = Math.round(
            (roundedCurrentTime / roundedDuration) * 100
        );
        setSongInfo({
            currentTime,
            duration,
            animationPercentage: animationPercent,
        });
        console.log(songInfo);
    }

    const songEndHandler = async (e: SyntheticEvent<HTMLAudioElement>) => {
        const index = listSong.findIndex((item) => item.id === currentSong.id);
        const nextIndex = (index + 1) % listSong.length;
        await handleChangCurrentSong(listSong[nextIndex]);
        if (isPlaySong) {
            audioRef.current?.play();
        }
    }
    const handlePlayButton = () => {
        if (isPlaySong) {
            audioRef.current?.pause();
            setIsPlaySong(!isPlaySong);
        } else {
            audioRef.current?.play();
            setIsPlaySong(!isPlaySong);
        }
    };
    const getTime = (time: number) => {
        return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
    }
    const handleOnChangeTrack = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        audioRef.current!.currentTime = value;
        setSongInfo({ ...songInfo, currentTime: value });

    }
    const handlePreviosButton =async(direction:string)=>{
        const index = listSong.findIndex((item)=>item.id === currentSong.id);
        if(direction==="next"){
            
            const nextIndex = (index+1) %listSong.length;
            await handleChangCurrentSong(listSong[nextIndex]);
            if(isPlaySong){
                audioRef.current?.play();
            }
        }
        if(direction==="previos"){
            const prevIndex = (index-1) %listSong.length;
            if(prevIndex<=-1){
                await handleChangCurrentSong(listSong[listSong.length-1]);
                if(isPlaySong){
                    audioRef.current?.play();
                }
                return;
            }
            await handleChangCurrentSong(listSong[prevIndex]);
            if(isPlaySong){
                audioRef.current?.play();
            }
        }
    }
    return (
        <div className="player">
             <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div
                    className="track"
                    style={{
                        background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
                    }}
                >
                    <input
                        type="range"
                        value={songInfo.currentTime}
                        max={songInfo.duration || 0}
                        min={0}
                        onChange={handleOnChangeTrack}
                    />
                    <div
                        className="anime-track"
                        style={{
                            transform: `translateX(${songInfo.animationPercentage}%)`,
                        }}
                    />
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon icon={faAngleLeft} size="1x" onClick={() => {
                    handlePreviosButton("previos")
                }} />
                <FontAwesomeIcon
                    icon={isPlaySong ? faPause : faPlay}
                    size="1x"
                    onClick={handlePlayButton}
                />
                <FontAwesomeIcon icon={faAngleRight} size="1x" onClick={() => {
                    handlePreviosButton("next")
                }} />
            </div> 
            <audio
                ref={audioRef}
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                onEnded={songEndHandler}
                src={currentSong.audio}
            ></audio>
        </div>
    )
}

export default Player;