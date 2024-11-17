import { createSlice } from "@reduxjs/toolkit";

const initialInputState = {
  slug: '',
  gitURL: null,
  framework: {
    name: "craReact",
    buildCommand: "npm run build",
    outputDir: "build",
    installCommand: "npm install",
  },
  envVar: [],
};

const inputSlice = createSlice({
  name: "input",
  initialState: initialInputState,
  reducers: {
    setSlug(state, action) {
      state.slug = action.payload;
    },
    setGitUrl(state, action) {
      state.gitURL = action.payload;
    },
    setFrameWork(state, action) {
      state.framework = action.payload;
    },
    setEnvVar(state, action) {
      const { key, value } = action.payload;
      state.envVar = [{ key, value }, ...state.envVar];
    },
    removeEnvVar(state, action) {
      const key = action.payload;
      state.envVar = state.envVar.filter((env) => env.key !== key);
    },
  },
});

export const inputActions = inputSlice.actions;
export default inputSlice.reducer;
