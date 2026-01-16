import { motion } from 'framer-motion';

interface PageHeroProps {
    title: string;
    subtitle: string;
    image?: string;
    children?: React.ReactNode;
}

const PageHero = ({ title, subtitle, image, children }: PageHeroProps) => {
    return (
        <div className="relative pt-32 pb-12 overflow-hidden bg-background">
            {/* Background elements */}
            <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" />

            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4"
                >
                    {title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-muted-foreground max-w-2xl mb-8"
                >
                    {subtitle}
                </motion.p>

                {children}

                {/* Optional Hero Image for the Page */}
                {image && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 rounded-2xl overflow-hidden shadow-2xl border border-border max-w-4xl w-full"
                    >
                        <img src={image} alt={title} className="w-full h-48 md:h-80 object-cover" />
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default PageHero;
