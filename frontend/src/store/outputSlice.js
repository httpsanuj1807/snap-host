import { createSlice } from "@reduxjs/toolkit";

const initialOuputSlice = {
  projectName: "",
  previewUrl: "",
  logs: [],
  deployProgress: 'notStarted',   // notStarted, deploying, deployFailed, deploySuccess
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
    setDeployProgress(state, action) {
      state.deployProgress = action.payload;
    },
  },
});

export const outputActions = outputSlice.actions;
export default outputSlice.reducer;
