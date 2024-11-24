import { createSlice } from '@reduxjs/toolkit';

const initialAuthSlice = {

    isAuth : false,
    userProfile: null,
}

const authSlice = createSlice({

    name: 'auth',
    initialState: initialAuthSlice,
    reducers: {  
        setIsLogin(state, action){
            state.isAuth = true;
            state.userProfile = action.payload;
        },
        setIsLogout(state){
            state.isAuth = false;
            state.userProfile = null;
        },
    
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;