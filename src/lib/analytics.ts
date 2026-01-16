import ReactGA from 'react-ga4';

const TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || '';

export const initGA = () => {
    if (TRACKING_ID) {
        ReactGA.initialize(TRACKING_ID);
    }
};

export const logPageView = () => {
    if (TRACKING_ID) {
        ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
    }
};

export const logEvent = (category: string, action: string, label?: string) => {
    if (TRACKING_ID) {
        ReactGA.event({
            category,
            action,
            label,
        });
    }
};

export const logConversion = (value: number, currency: string = 'INR') => {
    if (TRACKING_ID) {
        ReactGA.event({
            category: 'Ecommerce',
            action: 'Purchase',
            value,
            label: currency,
        });
    }
};
