import React, { createContext, useState, useContext } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Export this function to use the context elsewhere
export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);  // user could be 'customer', 'vendor', 'admin' or null

    const loginAsCustomer = () => setUser('customer');
    const loginAsVendor = () => setUser('vendor');
    const loginAsAdmin = () => setUser('admin');
    const logout = () => setUser(null);

    const value = {
        user,
        loginAsCustomer,
        loginAsVendor,
        loginAsAdmin,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
