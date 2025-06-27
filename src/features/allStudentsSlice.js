import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
};

const allStudentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },
  },
});

export const { setStudents } = allStudentsSlice.actions;
export default allStudentsSlice.reducer;
