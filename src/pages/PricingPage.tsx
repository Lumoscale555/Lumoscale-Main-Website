import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
import { Helmet } from "react-helmet-async";

const PricingPage = () => {
    return (
        <div className="min-h-screen bg-black text-foreground">
             <Helmet>
                <title>Lumoscale Pricing - AI Agent Plans & Costs</title>
                <meta name="description" content="View pricing for Lumoscale's AI Front Desk agents. Transparent plans for Voice Agents, Text Chatbots, and complete automation systems for Real Estate." />
                <link rel="canonical" href="https://www.lumoscale.com/pricing" />
            </Helmet>
            <Header />
            <div className="pt-20">
                <Pricing />
            </div>
            <Footer />
        </div>
    );
};

export default PricingPage;
