import { createSlice } from '@reduxjs/toolkit';

const initialGithubState = {
    userName: '',
    gitRepos: [],
    repoSelected: null,
};

const githubSlice = createSlice({
    name: 'github',
    initialState: initialGithubState,
    reducers: {  
        setUserName(state, action) {
            state.userName = action.payload;
        },
        setGitRepos(state, action) {
            state.gitRepos = action.payload;
        },
        setSelectedRepo(state, action) {
            state.repoSelected = action.payload;
        }
    }
});

export const githubActions = githubSlice.actions;
export default githubSlice.reducer;
