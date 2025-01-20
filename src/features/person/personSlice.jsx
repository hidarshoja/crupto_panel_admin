import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    
    addPerson: (state, action) => {
      state.value = action.payload
    },
    clearPerson: (state) => {
      state.value = initialState.value;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addPerson,clearPerson } = personSlice.actions

export default personSlice.reducer