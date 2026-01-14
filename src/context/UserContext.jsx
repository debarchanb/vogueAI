import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [userProfile, setUserProfile] = useState(() => {
        const saved = localStorage.getItem('vogueAI_profile');
        return saved ? JSON.parse(saved) : {};
    });

    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem('vogueAI_wishlist');
        return saved ? parseInt(saved, 10) : 0;
    });

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [onboarded, setOnboarded] = useState(() => {
        return !!localStorage.getItem('vogueAI_onboarded');
    });

    // Verify token on mount
    useEffect(() => {
        const token = localStorage.getItem('vogueAI_token');
        if (token) {
            fetch('/api/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.valid) setIsAuthenticated(true);
                    else logout();
                })
                .catch(() => logout());
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('vogueAI_profile', JSON.stringify(userProfile));
    }, [userProfile]);

    useEffect(() => {
        localStorage.setItem('vogueAI_wishlist', wishlist.toString());
    }, [wishlist]);

    useEffect(() => {
        if (onboarded) localStorage.setItem('vogueAI_onboarded', 'true');
        else localStorage.removeItem('vogueAI_onboarded');
    }, [onboarded]);

    const login = async (username, password) => {
        try {
            console.log('Sending login request to server...');
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            console.log('Response status:', res.status);
            const text = await res.text();
            console.log('Response body:', text);
            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                console.error('Failed to parse JSON:', e);
                return { success: false, message: 'Server returned invalid response' };
            }

            if (data.success) {
                localStorage.setItem('vogueAI_token', data.token);
                setUserProfile(prev => ({ ...prev, ...data.profile }));
                setIsAuthenticated(true);
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (err) {
            console.error('Login Error:', err);
            return { success: false, message: 'Server error: ' + err.message };
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setOnboarded(false);
        setUserProfile({});
        setWishlist(0);
        localStorage.clear();
    };

    const completeOnboarding = (profile) => {
        setUserProfile(profile);
        setOnboarded(true);
    };

    const addToWishlist = () => setWishlist(prev => prev + 1);

    return (
        <UserContext.Provider value={{
            userProfile,
            wishlist,
            isAuthenticated,
            onboarded,
            login,
            logout,
            completeOnboarding,
            addToWishlist
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
