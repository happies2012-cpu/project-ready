import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/ui/page-hero';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Clock } from 'lucide-react';

const Careers = () => {
    const jobs = [
        { title: 'Senior React Developer', department: 'Engineering', location: 'Bangalore (Hybrid)', type: 'Full-time' },
        { title: 'AI Research Scientist', department: 'R&D', location: 'Remote', type: 'Full-time' },
        { title: 'Content Writer (Technical)', department: 'Content', location: 'Bangalore', type: 'Part-time' },
    ];

    return (
        <div className="min-h-screen">
            <Navbar />
            <PageHero
                title="Careers at Project Ready"
                subtitle="Join us in shaping the future of technical education. We're looking for passionate individuals."
                image="/images/landing/office_team_meeting.png"
            />

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8">Open Positions</h2>
                    <div className="space-y-4">
                        {jobs.map((job, i) => (
                            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-card border border-border rounded-xl">
                                <div>
                                    <h3 className="font-semibold text-lg">{job.title}</h3>
                                    <div className="flex items-center gap-4 text-muted-foreground text-sm mt-2">
                                        <div className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {job.department}</div>
                                        <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</div>
                                        <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {job.type}</div>
                                    </div>
                                </div>
                                <Button className="mt-4 md:mt-0">Apply Now</Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Careers;
