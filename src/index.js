import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthProvider from './AuthProvider/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-confirm-alert/src/react-confirm-alert.css';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </QueryClientProvider>
);