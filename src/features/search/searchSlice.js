import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   value: "",
// };

export const searchSlice = createSlice({
  name: "search",
  initialState: { value: "" },
  reducers: {
    setSearch: (state, action) => {
      state.value = action.payload;
    },

    clearSearch: (state) => {
      state.value = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSearch, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;
