import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import allStudentsReducer from "./features/allStudentsSlice";
import allCompaniesReducer from "./features/allCompaniesSlice";
import companyJobsReducer from "./features/companyJobsSlice";
import allJobsReducer from "./features/allJobsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    students: allStudentsReducer,
    company: allCompaniesReducer,
    jobs: companyJobsReducer,
    allJobs: allJobsReducer,
  },
});
