import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entries: {}, // This will hold entries keyed by date
};

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    addEntry: (state, action) => {
      const { date, entry } = action.payload;
      state.entries[date] = entry;
    },
    editEntry: (state, action) => {
      const { date, entry } = action.payload;
      state.entries[date] = entry;
    },
  },
});

export const { addEntry, editEntry } = journalSlice.actions;
export default journalSlice.reducer;
