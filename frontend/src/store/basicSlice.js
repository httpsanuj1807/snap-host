import { createSlice } from '@reduxjs/toolkit';

const initialBasicState = {
    error : '',
    loading: false,
    pageState: 'configure'
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
        },
        setPageState(state, action){
            state.pageState = action.payload
        }
    }
})

export const basicActions = basicSlice.actions;
export default basicSlice.reducer;