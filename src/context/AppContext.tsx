import React, { createContext, ReactElement, useEffect, useReducer } from 'react'
import { SongInt } from '../components/song';
import {AppReducer} from './AppReducer';
import data from '../data';

const parsedData = data()
export interface AppState{
    isLibraryOpen:boolean
    isSettingOpen:boolean
    isDarkmode:boolean
    listSong:Array<SongInt>
    currentSong:SongInt
}
interface AppContextInt extends AppState{
    handleToggleDarkMode:()=>void
    handleToggleSetting:()=>void
    handleToggleLibrary:()=>void
    handleChangCurrentSong:(song:SongInt)=>void
}
const initState:AppState={
    isLibraryOpen:false,
    isSettingOpen:false,
    isDarkmode:false,
    listSong:parsedData,
    currentSong:parsedData[0]
}
export const AppContext = createContext<AppContextInt>({} as AppContextInt);

const AppProvider: React.FC =({children}:any)=>{
    const [state,dispatch] = useReducer(AppReducer,initState);

    const handleToggleDarkMode=()=>{

    }
    const handleToggleSetting = ()=>{

    }
    const handleToggleLibrary=()=>{
        console.log('zzz');
        dispatch({type:"TOGGLE_LIBRARY_OPEN"});
    }
    const handleChangCurrentSong =(song:SongInt)=>{
        dispatch({type:"CHANGE_CURRENT_SONG",payload:song});
    }
    useEffect(()=>{
        dispatch({type:"ACTIVE_LIBRARY_HANDLER",payload:state.currentSong})
    },[state.currentSong])
    return(
        <AppContext.Provider value={{
            ...state,
            handleToggleDarkMode,
            handleToggleSetting,
            handleToggleLibrary,
            handleChangCurrentSong
        }}>
            {children}
        </AppContext.Provider>
    )
}
export default AppProvider;