import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        value: '',
    },
    reducers: {
        //This are the methods that alter the data in this slice
        //Action is the data I get from searchbar.jsx
        logSearch: (state, action) => {
            state.value = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { logSearch } = searchSlice.actions

export default searchSlice.reducer