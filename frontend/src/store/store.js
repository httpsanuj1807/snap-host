import { configureStore } from '@reduxjs/toolkit';
import basicReducer from './basicSlice.js'
import githubReducer from './githubSlice.js'
import inputReducer from './inputSlice.js'
import outputReducer from './outputSlice.js'
import authReducer from './authSlice.js'

const store = configureStore({

    reducer: {
        basic: basicReducer,
        github: githubReducer,
        input: inputReducer,
        output: outputReducer,
        auth: authReducer
    }

});

export default store;