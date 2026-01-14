import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import Login from './pages/Login';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useUser();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return children;
}

function AppContent() {
  const { isAuthenticated, onboarded } = useUser();

  return (
    <Routes>
      <Route path="/" element={
        isAuthenticated ? (
          onboarded ? <Navigate to="/dashboard" replace /> : <Navigate to="/onboarding" replace />
        ) : (
          <Login />
        )
      } />

      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/" replace /> : <Login />
      } />

      <Route path="/onboarding" element={
        <ProtectedRoute>
          {onboarded ? <Navigate to="/dashboard" replace /> : <OnboardingPage />}
        </ProtectedRoute>
      } />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          {onboarded ? <DashboardPage /> : <Navigate to="/onboarding" replace />}
        </ProtectedRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

export default App;
