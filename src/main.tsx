import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';

// Initialize analytics and monitoring
import { initGA, logPageView } from '@/lib/analytics';
import { initSentry } from '@/lib/sentry';

// Initialize Sentry for error tracking
initSentry();

// Initialize Google Analytics
initGA();

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1,
        },
    },
});

function Root() {
    useEffect(() => {
        // Log initial page view
        logPageView();
    }, []);

    return (
        <React.StrictMode>
            <HelmetProvider>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </HelmetProvider>
        </React.StrictMode>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
