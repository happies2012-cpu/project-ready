import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/ui/page-hero';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
    const faqs = [
        { q: "Are the projects plagiarized?", a: "No, all our projects are 100% unique and built by our internal team of developers. We provide plagiarism reports with every download." },
        { q: "Do I get the full source code?", a: "Yes, you get the complete source code, database files, and documentation (PPT + Report) in the zip file." },
        { q: "Can I get a refund?", a: "Due to the digital nature of the product, we generally do not offer refunds once files are downloaded. However, if the project is broken, we will fix it or refund you." },
        { q: "Do you provide installation support?", a: "Yes, our support team can help you set up the project on your machine via AnyDesk or TeamViewer." },
        { q: "Is payment secure?", a: "Absolutely. We use Razorpay and Google Pay which are 100% secure and PCI-DSS compliant." },
    ];

    return (
        <div className="min-h-screen">
            <Navbar />
            <PageHero
                title="Frequently Asked Questions"
                subtitle="Common questions about our projects and services."
            />

            <div className="container mx-auto px-4 py-16 max-w-3xl">
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, i) => (
                        <AccordionItem key={i} value={`item-${i}`}>
                            <AccordionTrigger className="text-left font-semibold">{faq.q}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {faq.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
            <Footer />
        </div>
    );
};

export default FAQ;
