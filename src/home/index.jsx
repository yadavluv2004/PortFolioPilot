import React from 'react';
import Header from '../components/custom/header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import "../index.css";

// Motion containers
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const featureVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

// Glowing shimmer button class
const glowShimmerButtonClass = `
  relative overflow-hidden text-white font-semibold
  shadow-[0_0_25px_rgba(216,70,239,0.9)]
  transition-all duration-300
  before:absolute before:inset-0
  before:bg-gradient-to-r before:from-purple-400 before:via-pink-400 before:to-purple-500
  before:bg-[length:200%_200%]
  before:animate-[shimmer_5s_linear_infinite]
  before:opacity-60
  before:-z-10
  [text-shadow:0_0_10px_rgba(255,255,255,0.9)];
`;

// Dummy data for features, steps, testimonials
const features = [
  {
    title: "AI-Powered Resume",
    description: "Generate a professional resume tailored to your skills.",
    backText: "Crafted with AI to impress recruiters."
  },
  {
    title: "Portfolio Integration",
    description: "Showcase your projects in a stunning online portfolio.",
    backText: "All your work, beautifully displayed."
  },
  {
    title: "ATS Optimization",
    description: "Ensure your resume passes automated resume screenings.",
    backText: "Get past the robots, get noticed by humans."
  },
];

const howItWorks = [
  { title: "Step 1", description: "Sign up and fill in your details." },
  { title: "Step 2", description: "Choose your preferred resume style." },
  { title: "Step 3", description: "Download or share your polished resume." },
];

const testimonials = [
  { name: "Alice", role: "Frontend Developer", feedback: "This tool saved me hours!" },
  { name: "Bob", role: "Backend Developer", feedback: "I finally got noticed by top companies." },
  { name: "Charlie", role: "Fullstack Developer", feedback: "Amazing results in minutes!" },
];

// Feature component
const Feature = ({ title, description, backText }) => (
  <motion.div
    className="p-6 bg-white rounded-xl shadow hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] transition text-center"
    variants={featureVariant}
    whileHover={{ scale: 1.05 }}
  >
    <h3 className="font-semibold text-purple-600 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
    <span className="text-sm text-gray-400">{backText}</span>
  </motion.div>
);

const Home = () => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <Header />

      {/* Animated Background Gradient */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-100 via-white to-purple-50 opacity-30 z-[-1]"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
        transition={{ duration: 15, ease: 'linear', repeat: Infinity }}
        style={{ backgroundSize: '200% 200%' }}
      />

      {/* Floating Blob */}
      <motion.div
        className="absolute top-10 right-10 w-64 h-64 bg-purple-300 rounded-full opacity-20 blur-3xl z-[-1]"
        animate={{
          y: [0, 30, 0, -20, 0],
          x: [0, -20, 0, 15, 0],
          rotate: [0, 10, -5, 5, 0],
          scale: [1, 1.05, 1, 1.08, 1],
        }}
        transition={{ duration: 12, ease: 'easeInOut', repeat: Infinity }}
      />

      {/* Hero Section */}
      <motion.section
        className="text-center py-20 px-4 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-5xl font-bold leading-tight bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent"
          initial={{ backgroundPosition: '0% 50%' }}
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          style={{ backgroundSize: '200% 200%' }}
        >
          Build Your Portfolio-Ready Resume
        </motion.h1>

        <p className="text-lg text-gray-600 mt-6 mb-8">
          PortfolioPilot helps developers and tech professionals craft stunning, AI-enhanced resumes that get noticed.
        </p>

        <Link to="/dashboard">
          <Button className={`text-white bg-purple-600 hover:bg-purple-700 px-6 py-3 text-lg rounded-full shadow-md ${glowShimmerButtonClass}`}>
            Get Started for Free
          </Button>
        </Link>

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
          <Feature
            key={index}
            title={f.title}
            description={f.description}
            backText={f.backText}
          />
        ))}
      </motion.section>

      {/* How It Works */}
      <motion.section
        className="bg-purple-50 py-16 px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <h2 className="text-3xl font-bold text-purple-600 mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {howItWorks.map((step, i) => (
            <motion.div
              key={i}
              className="p-6 bg-white rounded-xl shadow hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] transition"
              variants={{ hidden: { opacity: 0, y: 40, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } } }}
              whileHover={{ scale: 1.07, rotate: [0, 1, -1, 0], y: -5 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-purple-600">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        className="py-16 px-6 max-w-6xl mx-auto overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-10">What Our Users Say</h2>
        <motion.div
          className="flex gap-8"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <motion.div
              key={i}
              className="p-6 bg-white rounded-xl shadow border border-purple-200 hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] transition"
              whileHover={{ scale: 1.07 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{ minWidth: '300px' }}
            >
              <p className="text-gray-600 italic mb-4">"{t.feedback}"</p>
              <h4 className="font-semibold text-purple-600">{t.name}</h4>
              <span className="text-xs text-gray-400">{t.role}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        className="text-center py-16 bg-purple-50 px-4 relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-purple-600 mb-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Ready to land your next role?
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-8 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Let PortfolioPilot craft your standout resume and portfolio in minutes. Make your application impossible to ignore!
        </motion.p>
        <Link to="/dashboard">
          <motion.div
            whileHover={{ scale: 1.05, y: -3, boxShadow: '0px 0px 30px rgba(168,85,247,0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Button className={`bg-purple-600 text-white hover:bg-purple-700 px-8 py-4 rounded-full text-lg font-semibold ${glowShimmerButtonClass}`}>
              Start Building Now
            </Button>
          </motion.div>
        </Link>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-600 py-10 mt-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-purple-600 mb-3">PortfolioPilot</h3>
            <p className="text-sm">
              AI-powered resume and portfolio builder designed for developers, engineers, and tech professionals.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/dashboard" className="hover:text-purple-600">Dashboard</Link></li>
              <li><Link to="/templates" className="hover:text-purple-600">Templates</Link></li>
              <li><Link to="/pricing" className="hover:text-purple-600">Pricing</Link></li>
              <li><Link to="/contact" className="hover:text-purple-600">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Features</h4>
            <ul className="space-y-2 text-sm">
              <li>AI Resume Optimization</li>
              <li>Customizable Templates</li>
              <li>One-Click PDF Export</li>
              <li>Portfolio Integration</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Follow Us</h4>
            <div className="flex gap-4">
              <a href="https://github.com/yadavluv2004" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-purple-600 transition-colors">
                <Github size={22} />
              </a>
              <a href="https://www.linkedin.com/in/luv-yadav-989424263/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-purple-600 transition-colors">
                <Linkedin size={22} />
              </a>
              <a href="https://www.instagram.com/2004luvyadav/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-purple-600 transition-colors">
                <Instagram size={22} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-8 pt-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} <b>PortfolioPilot - Luv Yadav</b>. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;




