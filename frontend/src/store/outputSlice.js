import { createSlice } from "@reduxjs/toolkit";

const initialOuputSlice = {
  projectName: "",
  previewUrl: "",
  logs: [],
  isSuccess: false,
};

const outputSlice = createSlice({
  name: "output",
  initialState: initialOuputSlice,
  reducers: {
    setProjectName(state, action) {
      state.projectName = action.payload;
    },
    setPreviewUrl(state, action) {
      state.previewUrl = action.payload;
    },
    setLogs(state, action) {
      if (action.payload.length === 0) {
        state.logs = [];
        return;
      }
      state.logs = [...state.logs, action.payload];
    },
    setIsSuccess(state) {
      state.isSuccess = !state.isSuccess;
    },
  },
});

export const outputActions = outputSlice.actions;
export default outputSlice.reducer;
