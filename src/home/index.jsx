import React from 'react';
import Header from '../components/custom/header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <Header />

      {/* Animated Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-100 via-white to-purple-50 animate-pulse opacity-30 z-[-1]" />

      {/* Floating Blob */}
      <motion.div
        className="absolute top-10 right-10 w-64 h-64 bg-purple-300 rounded-full opacity-20 blur-3xl z-[-1]"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />

      {/* Hero Section */}
      <motion.section
        className="text-center py-20 px-4 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold text-purple-600 leading-tight mb-6">
          Build Your Portfolio-Ready Resume, Backed by AI
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          PortfolioPilot helps developers and tech professionals craft stunning, AI-enhanced resumes that get noticed.
        </p>
        <Link to="/dashboard">
          <Button className="text-white bg-purple-600 hover:bg-purple-700 px-6 py-3 text-lg rounded-full shadow-lg transition-transform hover:scale-105">
            Get Started for Free
          </Button>
        </Link>

        {/* Scroll Prompt */}
        <motion.div
          className="mt-10 text-purple-400 text-sm"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          ↓ Scroll to see features
        </motion.div>
      </motion.section>

      {/* Feature Section */}
      <motion.section
        className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto py-16"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {features.map((f, index) => (
          <Feature key={index} title={f.title} description={f.description} />
        ))}
      </motion.section>

      {/* Final CTA Section */}
      <section className="text-center py-12 bg-purple-50 px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-purple-600 mb-4">
          Ready to land your next role?
        </h2>
        <Link to="/dashboard">
          <Button className="bg-purple-600 text-white hover:bg-purple-700 px-6 py-3 rounded-full text-lg">
            Start Building Now
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 text-sm text-gray-500">
        © {new Date().getFullYear()} <b>PortfolioPilot - Luv Yadav</b>. All rights reserved.
      </footer>
    </div>
  );
};

// Feature motion container and variant
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const featureVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

// Features List
const features = [
  {
    title: "AI-Powered Content",
    description: "Instantly generate bullet points and summaries tailored to your job role and experience.",
  },
  {
    title: "Customizable Templates",
    description: "Choose from modern, clean designs built for impact and readability.",
  },
  {
    title: "One-Click Export",
    description: "Download PDF resumes instantly — polished and job-ready.",
  },
];

// Feature Card Component
const Feature = ({ title, description }) => (
  <motion.div
    className="p-6 rounded-xl bg-purple-600 hover:shadow-xl transition duration-300 text-left"
    variants={featureVariant}
    transition={{ duration: 0.6 }}
  >
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-purple-100">{description}</p>
  </motion.div>
);

export default Home;



