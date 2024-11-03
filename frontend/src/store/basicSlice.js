import { createSlice } from '@reduxjs/toolkit';

const initialBasicState = {
    error : '',
    loading: false,
}

const basicSlice = createSlice({

    name: 'basic',
    initialState: initialBasicState,
    reducers: {  
        setError(state, action){
            state.error = action.payload;
        },
        toggleLoading(state){
            state.loading = !state.loading;
        }
    }
})

export const basicActions = basicSlice.actions;
export default basicSlice.reducer;