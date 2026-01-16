import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Terms = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-32 max-w-4xl prose dark:prose-invert">
                <h1>Terms of Service</h1>
                <p>Last updated: January 16, 2026</p>

                <h3>1. Acceptance of Terms</h3>
                <p>By accessing and using Project Ready, you agree to be bound by these Terms of Service.</p>

                <h3>2. License</h3>
                <p>When you purchase a project, you are granted a non-exclusive, non-transferable license to use the code for academic or personal learning purposes. Reselling the code is strictly prohibited.</p>

                <h3>3. Refunds</h3>
                <p>All sales are final. Please check the project demo and description carefully before purchasing.</p>

                <h3>4. Limitation of Liability</h3>
                <p>Project Ready is not liable for any indirect, incidental, or consequential damages arising from the use of our products.</p>
            </div>
            <Footer />
        </div>
    );
};

export default Terms;
