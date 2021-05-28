import React, { useState, useContext, useEffect } from 'react';

const users = [
    {id: 1, name: 'one'},
    {id: 2, name: 'two'},
    {id: 3, name: 'three'},
    {id: 4, name: 'four'},
    {id: 5, name: 'five'},
    {id: 6, name: 'six'},
    {id: 7, name: 'seven'},
    {id: 8, name: 'eight'},
    {id: 9, name: 'nine'},
    {id: 10, name: 'ten'}
];

const findUser = (name) => {
    const user = users.find((u) => u.name === name);
    if (user === undefined) {
        return null; 
    }
    return user;
};

const storeActiveUser = (user) => {
    sessionStorage.setItem('active-user', JSON.stringify(user));
}

const getStoredActiveUser = () => {
    if (sessionStorage.hasOwnProperty('active-user')) {
        return JSON.parse(sessionStorage.getItem('active-user'));
    }
    return null;
}

const userContext = React.createContext();

export const UserContextProvider = ({children}) => {
    const [activeUser, setActiveUser] = useState(null);
    const [loginFailed, setLoginFailed] = useState(false);

    useEffect(() => {
        const storedActiveUser = getStoredActiveUser();
        if (storedActiveUser !== null) {
            setActiveUser(storedActiveUser);
        }
    }, []);

    useEffect(() => {
        storeActiveUser(activeUser);
    }, [activeUser])

    const value = {
        activeUser: activeUser,
        login: (name) => {
            const user = findUser(name);
            if (user === null) {
                setLoginFailed(true)
            }
            else {
                setLoginFailed(false);
                setActiveUser(user);
            }
            
        },
        logout: () => setActiveUser(null),
        loginFailed: loginFailed
    };

    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    );
}

export const useUserContext = () => {
    return useContext(userContext);
}