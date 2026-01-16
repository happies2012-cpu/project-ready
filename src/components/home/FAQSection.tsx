
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "What is Project Ready?",
        answer: "Project Ready is a comprehensive platform providing high-quality, ready-made projects, extensive documentation, and AI-powered tools for students and developers.",
    },
    {
        question: "How do I download a project?",
        answer: "Simply browse our collection, select a project, and choose your preferred plan. Once purchased (or if free), you can download the source code and documentation instantly from your dashboard.",
    },
    {
        question: "Are the projects plagiarized?",
        answer: "No, all our projects are original and come with unique documentation to ensure authenticity. We encourage using them as learning resources and templates.",
    },
    {
        question: "Can I get a refund?",
        answer: "We offer a 7-day money-back guarantee if the project does not meet the specified features or contains critical bugs that we cannot resolve.",
    },
    {
        question: "Do you offer technical support?",
        answer: "Yes, our Premium and Custom plans include 24/7 technical support to help you with setup and basic customization.",
    },
];

const FAQSection = () => {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Find answers to common questions about our projects and services.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left font-medium">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
