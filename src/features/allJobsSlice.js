import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allJobs: [],
};

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    UpdateJobData: (state, action) => {
      const { id, type } = action.payload;
      const job = state.allJobs.find((job) => job.id === id);
      if (job && type === "toggle") {
        job.status = job.status === "open" ? "closed" : "open";
      }
      if (job && type === "update") {
        Object.assign(job, data);
      }
    },
  },
});

export const { setAllJobs, UpdateJobData } = allJobsSlice.actions;
export default allJobsSlice.reducer;
