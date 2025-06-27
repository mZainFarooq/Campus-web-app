import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
};

const companyjobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
  },
});

export const { setJobs } = companyjobSlice.actions;
export default companyjobSlice.reducer;
