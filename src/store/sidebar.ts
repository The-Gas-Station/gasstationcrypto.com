import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    open: true,
  },
  reducers: {
    toggle: (state) => {
      state.open = !state.open;
    },
  },
});

export const { toggle } = sidebarSlice.actions;

export default sidebarSlice.reducer;
