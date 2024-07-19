import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    loading: false,
    user: "",
    token:"",
    error: "" 
} 

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(userCredentials)=>{
        try {
            const request = await axios.post('https://justina.somee.com/api/Account/authenticate', userCredentials);
            const response = request.data;
            localStorage.setItem('user', JSON.stringify(response));
            return response;
        } catch (error) {
            console.error('Error logging:', error);
            throw error;
        }

    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setCredentials: (state, action) => {
            const { user, accessToken} = action.payload
            state.user = user
            state.token = accessToken
        },
        /*logOut: (state, action) => {
            state.user = null
            state.token = null
        }*/
    },
    extraReducers:(builder) => {
        builder
        .addCase(loginUser.pending,(state) => {
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(loginUser.fulfilled,(state,action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(loginUser.rejected,(state,action) => {
            state.loading = false;
            state.user = null;
            console.log(action.error.message);
            if(action.error.message === "Error 401"){
                state.error = "Acceso denegado"
            }
            else{
                state.error = action.error.message;
            }
        })
        
    }
});

export default userSlice.reducer

//export const selectCurrentUser = (state) => state.user.user
//export const selectCurrentToken = (state) => state.user.token