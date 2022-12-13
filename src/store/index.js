/*
Redux store to keep track of all the filtering settings for the food page and the home page
*/

import { createSlice, configureStore } from "@reduxjs/toolkit";

// Initial state for the food page
const initialFoodState = { view: "table" };

// Slice for the food page
// Currently not in use -- would use this to switch between bar chart/pie chart/etc
const foodSlice = createSlice({
  name: "foodPage",
  initialState: initialFoodState,
  reducers: {
    changeView(state, action) {
      state.view = action.payload;
    },
  },
});

const store = configureStore({ reducer: foodSlice.reducer });

export const foodActions = foodSlice.actions;
export default store;
