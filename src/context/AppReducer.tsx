import React from "react";
import { SongInt } from "../components/song";
import { AppState } from "./AppContext";

type AppActionType =
  | { type: "TOGGLE_DARK_MODE"}
  | { type: "TOGGLE_LIBRARY_OPEN" }
  | { type: "TOGGLE_SETTINGS_OPEN" }
  | { type: "CHANGE_CURRENT_SONG" ,payload:SongInt}
  | { type: "ACTIVE_LIBRARY_HANDLER" ,payload:SongInt};

export const AppReducer = (state: AppState, action: AppActionType) => {
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      return { ...state, isDarkmode: !state.isDarkmode };
    case "TOGGLE_LIBRARY_OPEN":
      return { ...state, isLibraryOpen: !state.isLibraryOpen };
    case "TOGGLE_SETTINGS_OPEN":
      return { ...state, isSettingOpen: !state.isSettingOpen };
    case "CHANGE_CURRENT_SONG":
        return {...state,currentSong:action.payload}
    case "ACTIVE_LIBRARY_HANDLER":
        const cloneListSong = state.listSong.map((item)=>{
            if(item.id === state.currentSong.id){
                return {...item,active:true}
            }
            return {...item,active:false};
        })
        return {...state,listSong:cloneListSong}
    default:
      return state;
  }
};
