import React, { useContext } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMusic} from '@fortawesome/free-solid-svg-icons';
import {AppContext} from '../context/AppContext'
const Nav:React.FC=()=>{
    const {handleToggleLibrary} = useContext(AppContext);
    return(
        <header>
            <nav>
                <h1>Waves
                </h1>
                <button onClick={handleToggleLibrary}>
                    Library
                    <FontAwesomeIcon icon={faMusic}/>
                </button>
            </nav>
        </header>
    )
}

export default Nav;