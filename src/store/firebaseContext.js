import { createContext } from "react";

const FirebaseContext = createContext({})

export const initState = {
  selectedPdfRef: null
}

export const firebaseReducer = (state, action) => {
  console.log('state: ', state);
  console.log('action: ', action);
  switch (action.type) {
    case 'SET_SELECTED_PDF_FILE_REF': 
      return {
        ...state,
        selectedPdfRef: action.payload
      }
    default:
      return state
  }
}



export default FirebaseContext