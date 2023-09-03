import { createSlice } from '@reduxjs/toolkit';

export const SignSlice = createSlice({
  name: 'sign',
  initialState: {
    // signees: [],
    currentSign: null,
    currentSignRefPath: '',
    signCanvas: [],
    showModal: false
  },
  reducers: {
    setSignToEdit: (state, action) => {
      console.log('action: ', action);
      console.log('payload: ', action.payload);
      state.currentSign = action.payload
    },
    setSignToEditRefPath: (state, action) => {
      console.log('action: ', action);
      console.log('payload: ', action.payload);
      state.currentSignRefPath = action.payload
    },
    setSignCanvasToList: (state, action) => {
      console.log('action.payload: ', action.payload);
      console.log(' state.signCanvas: ', state.signCanvas);
      state.signCanvas = [...state.signCanvas, action.payload]
    },

    resetSignCanvas: (state) => {
      state.signCanvas = []
    },
    setShowModal:(state, action) => {
      state.showModal = action.payload
    }
  },
});

export const { setSignToEdit, setShowModal, setSignToEditRefPath, setSignCanvasToList, resetSignCanvas } = SignSlice.actions;

export const selectCurrentSign = state => state.sign.currentSign;
export const selectShowModal = state => state.sign.showModal;
export const selectSignToEditRefPath = state => state.sign.currentSignRefPath;
export const selectSignCanvas = state => state.sign.signCanvas;


export default SignSlice.reducer;
