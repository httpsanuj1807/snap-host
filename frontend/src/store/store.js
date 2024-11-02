import { configureStore } from '@reduxjs/toolkit';
import basicReducer from './basicSlice.js'
import githubReducer from './githubSlice.js'

const store = configureStore({

    reducer: {
        basic: basicReducer,
        github: githubReducer
    }

});

export default store;