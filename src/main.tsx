import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme-provider';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
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
                <BrowserRouter>
                    <QueryClientProvider client={queryClient}>
                        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                            <AuthProvider>
                                <App />
                                <Toaster />
                            </AuthProvider>
                        </ThemeProvider>
                    </QueryClientProvider>
                </BrowserRouter>
            </HelmetProvider>
        </React.StrictMode>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
