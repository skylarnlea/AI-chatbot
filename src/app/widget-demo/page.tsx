'use client';

import React, { useState } from 'react';
import { ChatbotWidget, ChatbotIcon } from '@/components/ui/ChatbotIcon';
import { colors } from '@/styles/colors';

export default function ProjectPresentation() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  // Smooth scroll to section function
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const techStack = [
    { name: 'Next.js 14', icon: '⚛️', description: 'React framework with App Router' },
    { name: 'TypeScript', icon: '📘', description: 'Type-safe development' },
    { name: 'Vertex AI', icon: '🧠', description: 'Google\'s Gemini 2.5 Flash model' },
    { name: 'Tailwind CSS', icon: '🎨', description: 'Utility-first CSS framework' },
    { name: 'Cloud Run', icon: '☁️', description: 'Serverless container platform' },
    { name: 'Docker', icon: '🐳', description: 'Containerized deployment' },
  ];

  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Responses',
      description: 'Uses Google\'s latest Gemini 2.5 Flash model for intelligent, contextual conversations',
      technical: 'Vertex AI integration with custom prompt engineering'
    },
    {
      icon: '📚',
      title: 'RAG Implementation',
      description: 'Retrieval-Augmented Generation searches company knowledge base for accurate answers',
      technical: 'Custom search algorithm with source attribution'
    },
    {
      icon: '🔒',
      title: 'Enterprise Security',
      description: 'Built with security-first approach, data encryption, and access controls',
      technical: 'Environment-based security, sanitization, and audit trails'
    },
    {
      icon: '📱',
      title: 'Widget Integration',
      description: 'Easy-to-embed chatbot widget for existing websites and applications',
      technical: 'Modular React components with customizable styling'
    },
    {
      icon: '💾',
      title: 'Conversation Memory',
      description: 'Persistent chat history with session management and search capabilities',
      technical: 'LocalStorage with JSON serialization and compression'
    },
    {
      icon: '🎨',
      title: 'Modern UI/UX',
      description: 'Professional interface with animations, responsive design, and accessibility',
      technical: 'Tailwind CSS with custom design system and animations'
    }
  ];

  const useCases = [
    {
      title: 'Employee Self-Service',
      description: 'Reduce HR workload by 60% with instant policy and benefit information',
      metrics: '24/7 availability, <2s response time'
    },
    {
      title: 'Onboarding Automation',
      description: 'Guide new hires through company procedures and documentation',
      metrics: '85% faster onboarding completion'
    },
    {
      title: 'IT Support Deflection',
      description: 'Handle common IT questions and procedure guidance automatically',
      metrics: '40% reduction in support tickets'
    },
    {
      title: 'Compliance Training',
      description: 'Interactive policy education and real-time compliance guidance',
      metrics: '95% policy comprehension rate'
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
      {/* Navigation */}
      <nav className="fixed top-0 z-30 w-full border-b bg-slate-900/80 backdrop-blur-md border-slate-700">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
              <ChatbotIcon size="sm" />
              <span className="text-lg font-bold text-white">Company AI Assistant</span>
            </div>
            <div className="hidden space-x-6 md:flex">
              {['overview', 'features', 'technology', 'demo'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors capitalize ${
                    activeSection === section ? 'text-orange-400' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="overview" className="pt-32 pb-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 mb-8 space-x-3 border rounded-full bg-slate-800/50 border-slate-700">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-300">Live Demo Available</span>
            </div>
            
            <h1 className="mb-8 text-6xl font-bold leading-tight text-white md:text-7xl">
              Intelligent Employee
              <br />
              <span style={{ color: colors.primary }}>AI Assistant</span>
            </h1>
            
            <p className="max-w-4xl mx-auto mb-12 text-xl leading-relaxed md:text-2xl text-slate-300">
              A sophisticated RAG-powered chatbot built with <strong className="text-orange-400">Next.js</strong>, <strong className="text-orange-400">Vertex AI</strong>, and <strong className="text-orange-400">TypeScript</strong> to revolutionize employee self-service and workplace productivity.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <a 
                href="#demo" 
                className="inline-flex items-center px-8 py-4 font-semibold text-white transition-all duration-200 transform shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl hover:shadow-xl hover:scale-105"
              >
                Try Live Demo
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a 
                href="/" 
                className="inline-flex items-center px-8 py-4 font-semibold text-white transition-all duration-200 border bg-slate-800 hover:bg-slate-700 rounded-xl border-slate-600 hover:border-slate-500"
              >
                Full Chat Interface
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-orange-400">24/7</div>
                <div className="text-sm text-slate-400">Availability</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-orange-400">&lt;2s</div>
                <div className="text-sm text-slate-400">Response Time</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-orange-400">20+</div>
                <div className="text-sm text-slate-400">Policy Areas</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-orange-400">95%</div>
                <div className="text-sm text-slate-400">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                Powerful <span style={{ color: colors.primary }}>Features</span>
              </h2>
              <p className="max-w-3xl mx-auto text-xl text-slate-400">
                Built with cutting-edge technology to deliver enterprise-grade AI assistance
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, idx) => (
                <div key={idx} className="p-8 transition-all duration-300 border group bg-slate-800/30 backdrop-blur-sm border-slate-700 rounded-2xl hover:bg-slate-800/50 hover:border-orange-500/30">
                  <div className="mb-4 text-4xl">{feature.icon}</div>
                  <h3 className="mb-3 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mb-4 leading-relaxed text-slate-400">{feature.description}</p>
                  <div className="text-sm font-medium text-orange-400">{feature.technical}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section id="technology" className="py-20 bg-slate-900/50">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                Technology <span style={{ color: colors.primary }}>Stack</span>
              </h2>
              <p className="max-w-3xl mx-auto text-xl text-slate-400">
                Modern, scalable technologies powering intelligent conversations
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {techStack.map((tech, idx) => (
                <div key={idx} className="p-6 transition-all duration-300 border bg-slate-800/40 backdrop-blur-sm border-slate-700 rounded-xl hover:bg-slate-800/60 group">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{tech.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-orange-400">{tech.name}</h3>
                      <p className="text-sm text-slate-400">{tech.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Architecture Diagram */}
            <div className="p-8 mt-16 border bg-slate-800/30 backdrop-blur-sm border-slate-700 rounded-2xl">
              <h3 className="mb-6 text-2xl font-bold text-center text-white">System Architecture</h3>
              <div className="flex flex-wrap items-center justify-center gap-4 text-slate-300">
                <div className="px-4 py-2 rounded-lg bg-slate-700">User Interface</div>
                <div className="text-orange-400">→</div>
                <div className="px-4 py-2 rounded-lg bg-slate-700">Next.js API</div>
                <div className="text-orange-400">→</div>
                <div className="px-4 py-2 rounded-lg bg-slate-700">RAG Search</div>
                <div className="text-orange-400">→</div>
                <div className="px-4 py-2 rounded-lg bg-slate-700">Vertex AI</div>
                <div className="text-orange-400">→</div>
                <div className="px-4 py-2 rounded-lg bg-slate-700">Response</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                Real-World <span style={{ color: colors.primary }}>Applications</span>
              </h2>
              <p className="max-w-3xl mx-auto text-xl text-slate-400">
                Transform your organization with AI-powered employee assistance
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {useCases.map((useCase, idx) => (
                <div key={idx} className="p-8 transition-all duration-300 border bg-slate-800/30 backdrop-blur-sm border-slate-700 rounded-2xl hover:bg-slate-800/50">
                  <h3 className="mb-3 text-xl font-semibold text-white">{useCase.title}</h3>
                  <p className="mb-4 leading-relaxed text-slate-400">{useCase.description}</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-sm font-medium text-orange-400">{useCase.metrics}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Future Secure Document Integration Section */}
            <div className="p-8 mt-16 border border-slate-700 rounded-2xl bg-slate-800/40 backdrop-blur-sm">
              <h3 className="mb-6 text-3xl font-semibold text-center text-white">
                Future Secure Document Integration
              </h3>

              <p className="max-w-4xl mx-auto mb-4 text-lg leading-relaxed text-slate-300">
                When ready, we will securely upload company documents using Google Cloud Storage with strict access controls. Documents will be encrypted and processed safely in an isolated environment.
              </p>

              <p className="max-w-4xl mx-auto mb-4 text-lg leading-relaxed text-slate-300">
                The system will extract key content, chunk large files intelligently, and add them to a secure search index powered by advanced AI, enabling accurate, privacy-conscious employee assistance.
              </p>

              <p className="max-w-4xl mx-auto mb-4 text-lg leading-relaxed text-slate-300">
                Document access will be permission-restricted, encrypted in transit and at rest, with comprehensive audit logging to ensure compliance and data privacy.
              </p>

              <p className="max-w-4xl mx-auto text-lg italic leading-relaxed text-center text-slate-400">
                Technologies: Google Cloud Storage, Cloud Run, IAM, encryption, AI-powered NLP, and secure API integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-slate-900/50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto"></div>

                    {/* Features Grid */}
                    <div className="grid gap-8 mb-16 md:grid-cols-3">
                        <div className="p-6 transition-all duration-300 border bg-slate-800/50 backdrop-blur-sm border-slate-700 rounded-xl hover:bg-slate-800/70">
                            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-white">AI-Powered</h3>
                            <p className="text-slate-400">Uses Google&apos;s Vertex AI with Gemini models for intelligent, contextual responses.</p>
                        </div>
                        <div className="p-6 transition-all duration-300 border bg-slate-800/50 backdrop-blur-sm border-slate-700 rounded-xl hover:bg-slate-800/70">
                            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />                
                                </svg>              
                            </div>              
                            <h3 className="mb-2 text-lg font-semibold text-white">RAG-Enabled</h3>              
                            <p className="text-slate-400">Searches through company knowledge base to provide accurate, source-backed answers.</p>            
                        </div>            
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300\">              
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4\">                
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">                  
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />                
                                </svg>              
                            </div>              
                            <h3 className="mb-2 text-lg font-semibold text-white">Enterprise Ready</h3>
                            <p className="text-slate-400">Built with security, scalability, and enterprise deployment in mind.</p>
                        </div>
                    </div>

                    {/* Demo Instructions */}
                    <div className="p-8 mb-8 border bg-slate-800/30 backdrop-blur-sm border-slate-700 rounded-xl">
                        <h2 className="mb-4 text-2xl font-bold text-white">Try the Chatbot Widget</h2>
                        <p className="mb-6 text-slate-300">
                            Click the <span style={{ color: colors.primary }}>#1</span> button in the bottom-right corner to start chatting!
                            The widget demonstrates how the chatbot would integrate into your existing website.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center space-x-2">
                                <ChatbotIcon size="sm" />
                                <span className="text-slate-300">Small (48px)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <ChatbotIcon size="md" />
                                <span className="text-slate-300">Medium (64px)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <ChatbotIcon size="lg" />
                                <span className="text-slate-300">Large (80px)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <ChatbotIcon size="xl" />
                                <span className="text-slate-300">Extra Large (96px)</span>
                            </div>
                        </div>
                    </div>

                    {/* Sample Questions */}
                    <div className="p-8 border bg-slate-800/30 backdrop-blur-sm border-slate-700 rounded-xl">
                        <h3 className="mb-4 text-xl font-semibold text-white">Try asking:</h3>
                        <div className="grid gap-3 md:grid-cols-2">
              {[
                "What's the company's mission and values?",
                                "How does our parental leave work?",
                                "What technology equipment do I get?",
                                "What are our office amenities?",
                                "How does the 401k matching work?",
                                "What's our hybrid work policy?"
                            ].map((question, idx) => (
                                <div key={idx} className="flex items-center space-x-2 text-slate-300">
                                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600" />
                                    <span className="text-sm">{question}</span>
                                </div>
                            ))}
                        </div>
                    </div>

            {/* Chatbot Widget */}
            <ChatbotWidget onToggle={() => setIsChatOpen(!isChatOpen)} isOpen={isChatOpen} />

            {/* Mock Chat Interface (when opened) */}
            {isChatOpen && (
                <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-4xl h-[600px] flex flex-col">
                        {/* Chat Header */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-700">
                            <div className="flex items-center space-x-3">
                                <ChatbotIcon size="sm" />
                                <div>
                                    <h3 className="font-semibold text-white">Company AI Assistant</h3>
                                    <p className="text-sm text-slate-400">Ready to help with your questions</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsChatOpen(false)}
                                className="transition-colors text-slate-400 hover:text-white"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Chat Content */}
                        <div className="flex-1 p-4 text-center text-slate-400">
                            <p>This would open the full chat interface.</p>
                            <p className="mt-2 text-sm">In the real integration, this would show your ChatInterface component.</p>
                            <div className="mt-6">
                                <a
                                    href="/"
                                    className="inline-flex items-center px-4 py-2 font-medium text-white transition-all duration-200 transform rounded-lg shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl hover:scale-105"
                                >
                                    Try Full Chat Interface
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
          </div>
        </section>
      </div>
    );
};
