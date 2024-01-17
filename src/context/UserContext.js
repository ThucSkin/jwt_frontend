import React, { useEffect, useState } from "react"
import { getUserAccount } from "../services/userService";

const UserConText = React.createContext(null);

const UserProvider = ({ children }) => {
    const userDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: '',
        account: {}
    }

    const [user, setUser] = useState(userDefault);

    const loginContext = (userData) => {
        setUser({ ...userData, isLoading: false });
    }

    const logout = () => {
        setUser({
            isLoading: false,
            isAuthenticated: false,
            token: '',
            account: {}
        });
    }

    const fetchUser = async () => {
        let response = await getUserAccount();

        if (response && response.errCode === 0) {
            let groupWithRoles = response.data.groupWithRoles;
            let email = response.data.email;
            let username = response.data.username;
            let token = response.data.access_token;

            let data = {
                isAuthenticated: true,
                token,
                account: { groupWithRoles, email, username },
                isLoading: false
            }
            setUser(data);
        } else {
            setUser({ ...userDefault, isLoading: false });
        }
    }

    useEffect(() => {
        if (window.location.pathname !== '/' || window.location.pathname !== '/login') {
            fetchUser();
        }
    }, []);


    return (
        <UserConText.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserConText.Provider>
    )
}

export { UserConText, UserProvider } 