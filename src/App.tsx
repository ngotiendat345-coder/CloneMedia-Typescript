import React from 'react';
import Library from './components/library';
import Nav from './components/nav';
import Player from './components/player';
import Song from './components/song';

function App(){
    return(
        <div className="App">
            <Nav/>
            <Song/>
            <Player/>
            <Library/>
        </div>
    )
}
export default App;