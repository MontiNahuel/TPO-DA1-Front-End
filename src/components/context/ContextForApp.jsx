import React, {createContext, useReducer} from "react";

const initialState = {
    userId: null,
    token: null,
    isAuthenticated: false,
    isVecino: false,
    
};

const AuthContext = React.createContext(initialState);

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                userId: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                isVecino: action.payload.isVecino
            };
        case 'LOGOUT':
            return {
                ...state,
                userId: null,
                token: null,
                isAuthenticated: false,
                isVecino: false
            };
        default:
            return state;
    }
};

const ContextForApp = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext, ContextForApp};