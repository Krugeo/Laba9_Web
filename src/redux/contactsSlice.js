import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContacts } from '../data/api';

export const getContacts = createAsyncThunk(
'contacts/getContacts',
async (_, { rejectWithValue }) => {
    try {
    const data = await fetchContacts(""); 

    const fakeActions = [
        "Вхідний дзвінок (3 хв)",
        "Відправлено email",
        "Вхідний дзвінок (15 хв)",
        "Пропущений виклик",
        "Короткий дзвінок"
    ];

    const contactsWithGroups = data.map(contact => {
        const historyCount = Math.floor(Math.random() * 4) + 1;
        const randomHistory = [];

        for (let i = 0; i < historyCount; i++) {
          const randomAction = fakeActions[Math.floor(Math.random() * fakeActions.length)];
          const date = new Date(Date.now() - Math.floor(Math.random() * 60 * 24 * 60 * 60 * 1000));
        
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

        randomHistory.push({
            action: `${formattedDate} - ${randomAction}`,
            date: date.toISOString()
        });
        }

        randomHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

        return {
        ...contact,
        group: Math.random() > 0.5 ? 'work' : 'family',
        history: randomHistory 
        };
    });
    return contactsWithGroups;
    } catch (error) {
    return rejectWithValue(error.message);
    }
}
);

const initialState = {
items: [],
status: 'idle',
error: null,
filterText: '',
filterGroup: 'all', 
favorites: []
};

const contactsSlice = createSlice({
name: 'contacts',
initialState,
reducers: {
    setFilterText: (state, action) => {
    state.filterText = action.payload;
    },
    setGroupFilter: (state, action) => {
    state.filterGroup = action.payload;
    },
    toggleFavorite: (state, action) => {
    const contactId = action.payload;
    if (state.favorites.includes(contactId)) {
        state.favorites = state.favorites.filter(id => id !== contactId);
    } else {
        state.favorites.push(contactId);
    }
    },
    updateContact: (state, action) => {
    const { id, updatedData } = action.payload;
    const index = state.items.findIndex(c => c.login.uuid === id);
    if (index !== -1) {
        state.items[index] = {
        ...state.items[index],
        phone: updatedData.phone,
        email: updatedData.email,
        name: { ...state.items[index].name, ...updatedData }
        };
        
        const now = new Date();
        const formattedNow = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        
        if (!state.items[index].history) state.items[index].history = [];
        state.items[index].history.unshift({
        action: `${formattedNow} - Оновлено дані контакту`,
        date: now.toISOString()
        });
    }
    }
},
extraReducers: (builder) => {
    builder
    .addCase(getContacts.pending, (state) => { state.status = 'loading'; })
    .addCase(getContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
    })
    .addCase(getContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
    });
}
});

export const { setFilterText, setGroupFilter, toggleFavorite, updateContact } = contactsSlice.actions;

export const selectFilteredContacts = (state) => {
    const { items, filterText, filterGroup } = state.contacts;
    return items.filter(contact => {
    const matchesText = contact.name.first.toLowerCase().includes(filterText.toLowerCase()) || 
                        contact.name.last.toLowerCase().includes(filterText.toLowerCase()) ||
                        contact.phone.includes(filterText); 
    const matchesGroup = (filterGroup === 'all' || filterGroup === 'favorites') 
        ? true 
        : contact.group === filterGroup;
        return matchesText && matchesGroup;
    });
};

export default contactsSlice.reducer;