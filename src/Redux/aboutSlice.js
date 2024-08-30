import { createSlice } from '@reduxjs/toolkit';

const aboutSlice = createSlice({
  name: 'about',
  initialState: {
    image: null, // Base64 string of the image
    name: 'John Doe',
    description: 'A brief description about John Doe.',
  },
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
  },
});

export const { setImage, setName, setDescription } = aboutSlice.actions;

export default aboutSlice.reducer;
