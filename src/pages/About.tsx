import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/ui/page-hero';

const About = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <PageHero
                title="About Project Ready"
                subtitle="Empowering the next generation of engineers and researchers with premium academic resources."
                image="/images/landing/office_team_meeting.png"
            />

            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-display font-bold mb-6">Our Mission</h2>
                        <p className="text-muted-foreground text-lg mb-6">
                            At Project Ready, we believe that every student deserves access to high-quality academic resources.
                            Education should be about innovation and understanding, not just struggle.
                        </p>
                        <p className="text-muted-foreground text-lg">
                            We curate, verify, and document top-tier projects across Engineering, Science, and Management
                            domains to help you excel in your academic journey.
                        </p>
                    </div>
                    <div className="bg-muted rounded-2xl p-8">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">1500+</div>
                                <div className="text-muted-foreground">Projects</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">45k+</div>
                                <div className="text-muted-foreground">Students</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                                <div className="text-muted-foreground">Universities</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">4.8</div>
                                <div className="text-muted-foreground">Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;
