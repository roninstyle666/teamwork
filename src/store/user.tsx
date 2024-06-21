import{createSlice} from '@reduxjs/toolkit'
import { getRoles } from '@testing-library/react'
const userSlice = createSlice({
    name:'user',
    initialState:{
        token:localStorage.getItem('token') || null,
        user:'',
    },
    reducers:{
        settoken:(state,action)=>{
            state.token=action.payload
            localStorage.setItem('token',action.payload)
            
        },
        setuser:(state,action)=>{
            state.user=action.payload
            localStorage.setItem('user',JSON.stringify(action.payload))
        },
        logout:(state)=>{
            state.token=null
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        },
      
    }
})
export const{settoken,setuser,logout}=userSlice.actions
export default userSlice.reducer