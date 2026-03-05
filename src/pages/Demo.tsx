import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DMDemo from "@/components/DMDemo";
import { Helmet } from "react-helmet-async";

const Demo = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Live AI Demo | Lumoscale</title>
        <meta name="description" content="Try our AI Voice & Text Agents live. Experience real-time conversation handling for Med Spas & Salons." />
      </Helmet>
      
      <Header />
      
      <div className="pt-20">
        <DMDemo />
      </div>

      <Footer />
    </div>
  );
};

export default Demo;
