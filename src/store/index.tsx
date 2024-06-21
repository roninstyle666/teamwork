import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import search from "./Search";



export default configureStore({
    reducer: {
        user: user,
        search:search
        
        
    }
    
})