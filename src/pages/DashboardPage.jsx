import React from 'react';
import Dashboard from '../components/Dashboard';
import { useUser } from '../context/UserContext';

export default function DashboardPage() {
    const { userProfile, wishlist, addToWishlist, logout } = useUser();

    return (
        <Dashboard
            userProfile={userProfile}
            wishlistCount={wishlist}
            onAddToWishlist={addToWishlist}
            onReset={logout}
        />
    );
}
