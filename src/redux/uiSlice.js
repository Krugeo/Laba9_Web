import { createSlice } from '@reduxjs/toolkit';

const initialState = {
isSearchVisible: false,
isEditingMode: false
};

const uiSlice = createSlice({
name: 'ui',
initialState,
reducers: {
    toggleSearch: (state) => {
    state.isSearchVisible = !state.isSearchVisible;
    },
    toggleEditMode: (state) => {
    state.isEditingMode = !state.isEditingMode;
    }
}
});

export const { toggleSearch, toggleEditMode } = uiSlice.actions;
export default uiSlice.reducer;
