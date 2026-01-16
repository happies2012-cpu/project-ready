import * as Sentry from '@sentry/react';

export const initSentry = () => {
    const dsn = import.meta.env.VITE_SENTRY_DSN;

    if (dsn) {
        Sentry.init({
            dsn,
            environment: import.meta.env.MODE,
            tracesSampleRate: 1.0,
            integrations: [
                new Sentry.BrowserTracing(),
                new Sentry.Replay(),
            ],
            replaysSessionSampleRate: 0.1,
            replaysOnErrorSampleRate: 1.0,
        });
    }
};

export const captureError = (error: Error, context?: Record<string, any>) => {
    Sentry.captureException(error, { extra: context });
};

export const setUser = (user: { id: string; email: string; name: string }) => {
    Sentry.setUser(user);
};

export const clearUser = () => {
    Sentry.setUser(null);
};
