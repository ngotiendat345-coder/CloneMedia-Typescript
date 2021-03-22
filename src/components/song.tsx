import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';

export interface SongInt {
    name: string,
    cover: string,
    artist: string,
    audio: string,
    active: boolean,
    id: string,
    color: [string, string]
}

const Song: React.FC = () => {
    const { currentSong } = useContext(AppContext);
    return (
        <section className="song-container">
            <img src={currentSong.cover} alt={currentSong.name} />
            <h2>{currentSong.name}</h2>
            <h3>{currentSong.artist}</h3>
        </section>
    )
}

export default Song;