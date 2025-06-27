import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company: [],
};

const allCompaniesSlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanies: (state, action) => {
      state.company = action.payload;
    },
  },
});

export const { setCompanies } = allCompaniesSlice.actions;
export default allCompaniesSlice.reducer;
