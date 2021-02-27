import { ONLOGGIN, ONLOGGINSUCCESS, ONLOGGINFALEID } from "./actions";

const initialState = {
    session: {},
    isSubmitting: false,
    error: ""
}

const user = (state = initialState, action) => {
    console.log(action.type);
    switch(action.type) {
        
        case ONLOGGIN:
        return { ...state, isSubmitting: true }

        case ONLOGGINSUCCESS: 
        return { ...state, isSubmitting: false, session: action.userSession }

        case ONLOGGINFALEID: 
        return { ...state, isSubmitting: false, error: action.error}

        default :
        return state;
    }
}

export default user;