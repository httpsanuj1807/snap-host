import { configureStore } from '@reduxjs/toolkit';
import basicReducer from './basicSlice.js'
import githubReducer from './githubSlice.js'
import inputReducer from './inputSlice.js'

const store = configureStore({

    reducer: {
        basic: basicReducer,
        github: githubReducer,
        input: inputReducer,
    }

});

export default store;