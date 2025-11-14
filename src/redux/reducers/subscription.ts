import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    plan:null
}


export const SubscriptionSlice = createSlice({
    name:"Subscription",
    initialState,
    reducers:{
        setSubscriptionData:(state,action) => {
            state.plan = action.payload
        },
        removeSubscriptionData:(state)=> {
            state.plan = null;
        }
    }
    
});


export const {removeSubscriptionData,setSubscriptionData} = SubscriptionSlice.actions;






