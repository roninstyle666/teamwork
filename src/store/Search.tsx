import { createSlice } from "@reduxjs/toolkit";
export const searchSlice = createSlice({
    name: "search",
    initialState: {
        value:'1',
    },
    reducers: {
        setSearch: (state, action) => {
            state.value = action.payload
            localStorage.setItem('search', JSON.stringify(action.payload))
        },
        resetSearch: (state) => {
            
            localStorage.removeItem('search')
            
        }
    }
})
export const { setSearch, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
 