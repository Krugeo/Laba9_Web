import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import contactsReducer from './contactsSlice';

export const store = configureStore({
reducer: {
    ui: uiReducer,
    contacts: contactsReducer,
},
});
