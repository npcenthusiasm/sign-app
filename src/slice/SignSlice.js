import { createSlice } from '@reduxjs/toolkit'

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
      state.currentSign = action.payload
    },
    setSignToEditRefPath: (state, action) => {
      state.currentSignRefPath = action.payload
    },
    setSignCanvasToList: (state, action) => {
      const newState = [...state.signCanvas]
      const { fabricCanvas, index } = action.payload
      newState[index] = fabricCanvas
      state.signCanvas = newState
      // state.signCanvas = [...state.signCanvas, action.payload]
    },

    resetSignCanvas: (state) => {
      state.signCanvas = []
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload
    }
  }
})

export const {
  setSignToEdit,
  setShowModal,
  setSignToEditRefPath,
  setSignCanvasToList,
  resetSignCanvas
} = SignSlice.actions

export const selectCurrentSign = (state) => state.sign.currentSign
export const selectShowModal = (state) => state.sign.showModal
export const selectSignToEditRefPath = (state) => state.sign.currentSignRefPath
export const selectSignCanvas = (state) => state.sign.signCanvas

export default SignSlice.reducer
