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
    setSignCanvasToList:(state, action) => {
      state.signCanvas.push(action.payload)
    },
    setShowModal:(state, action) => {
      state.showModal = action.payload
    }
    // resetSignee: (state, action) => {
    //   console.log('resetSignee');
    //   state.signees = [];
    // }
  },
});

export const { setSignToEdit, setShowModal, setSignToEditRefPath } = SignSlice.actions;

export const selectCurrentSign = state => state.sign.currentSign;
export const selectShowModal = state => state.sign.showModal;
export const selectSignToEditRefPath = state => state.sign.currentSignRefPath;


export default SignSlice.reducer;
