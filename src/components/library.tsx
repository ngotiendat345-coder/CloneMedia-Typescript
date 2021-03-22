import React, { useContext, useEffect } from "react";
import { AppContext } from '../context/AppContext';

const Library: React.FC = () => {
  const { isLibraryOpen, listSong, handleChangCurrentSong } = useContext(AppContext);
  const changeCurrentSong = (id: string) => {
    const index = listSong.findIndex((item) => item.id === id);
    handleChangCurrentSong(listSong[index]);
  }
  
  return (
    <div className={isLibraryOpen ? "library acitive-library" : "library"}>
      <h2>Library of Songs</h2>
      <div className="library-songs">
        {listSong.map((item) => {
          const { cover, id, active, artist, name } = item;
          return (
            <article className={active ? "library-song selected" : "library-song"} key={id} onClick={() => {
              changeCurrentSong(id)
            }}>
              <img src={cover} />
              <div className="song-description">
                <h3>{name}</h3>
                <h4>{artist}</h4>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
export default Library;
