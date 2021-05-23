import React, {createContext} from "react";

function noop () {}

export const AuthContext = createContext({
    token: '',
    userId: '',
    login: noop,
    logout: noop
})