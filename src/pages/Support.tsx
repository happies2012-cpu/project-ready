import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/ui/page-hero';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Support = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <PageHero
                title="Support Center"
                subtitle="How can we help you today?"
                image="/images/landing/customer_support_happy.png"
            >
                <div className="relative max-w-lg w-full mt-8">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input className="pl-10 h-12 rounded-full" placeholder="Search for help articles..." />
                </div>
            </PageHero>

            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-8 rounded-2xl bg-muted/30 border border-border">
                        <h3 className="font-bold text-lg mb-2">Account & Billing</h3>
                        <p className="text-muted-foreground text-sm mb-4">Issues with payments or login?</p>
                        <Button variant="link">View Articles</Button>
                    </div>
                    <div className="p-8 rounded-2xl bg-muted/30 border border-border">
                        <h3 className="font-bold text-lg mb-2">Downloading Projects</h3>
                        <p className="text-muted-foreground text-sm mb-4">Trouble accessing your files?</p>
                        <Button variant="link">View Articles</Button>
                    </div>
                    <div className="p-8 rounded-2xl bg-muted/30 border border-border">
                        <h3 className="font-bold text-lg mb-2">Custom Development</h3>
                        <p className="text-muted-foreground text-sm mb-4">Need a specific project built?</p>
                        <Button variant="link">View Articles</Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Support;
