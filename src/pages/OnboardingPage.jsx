import React from 'react';
import Onboarding from '../components/Onboarding';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function OnboardingPage() {
    const { completeOnboarding } = useUser();
    const navigate = useNavigate();

    const handleComplete = (profile) => {
        completeOnboarding(profile);
        navigate('/dashboard');
    };

    return <Onboarding onComplete={handleComplete} />;
}
