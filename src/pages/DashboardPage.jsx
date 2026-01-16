import React from 'react';
import Dashboard from '../components/Dashboard';
import { useUser } from '../context/UserContext';

export default function DashboardPage() {
    const { userProfile, wishlist, addToWishlist, removeFromWishlist, logout } = useUser();

    return (
        <Dashboard
            userProfile={userProfile}
            wishlist={wishlist}
            onAddToWishlist={addToWishlist}
            onRemoveFromWishlist={removeFromWishlist}
            onReset={logout}
        />
    );
}
