import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Privacy = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-32 max-w-4xl prose dark:prose-invert">
                <h1>Privacy Policy</h1>
                <p>Last updated: January 16, 2026</p>

                <h3>1. Introduction</h3>
                <p>Welcome to Project Ready. We respect your privacy and are committed to protecting your personal data.</p>

                <h3>2. Data We Collect</h3>
                <p>We collect information you provide directly to us, such as name, email address, and payment information when you purchase a project.</p>

                <h3>3. How We Use Your Data</h3>
                <p>We use your data to:</p>
                <ul>
                    <li>Process your orders and deliver files.</li>
                    <li>Send you updates and support messages.</li>
                    <li>Improve our website and services.</li>
                </ul>

                <h3>4. Data Security</h3>
                <p>We implement appropriate security measures to protect your personal information.</p>
            </div>
            <Footer />
        </div>
    );
};

export default Privacy;
