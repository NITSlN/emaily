import { FETCH_USER } from "../actions/types";

export default (state=null,action)=>{
    switch(action.type){
        case FETCH_USER:
            return action.payload || false // empty string means false so if action.payload is empty then return value will be false, to make that possible we have added "|| false"
        default:
            return state;
    }
}