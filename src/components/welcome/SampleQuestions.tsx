// src/components/welcome/SampleQuestions.tsx
import React from 'react';
import { colors } from '@/styles/colors';

interface SampleQuestionsProps {
  selectedTopic: string;
  onQuickAction: (action: string) => void;
  onBack: () => void;
}

const topicQuestions = {
  'Company Policies': [
  "What's the company's mission and core values?",
    "What's our dress code policy?",
    "Tell me about our code of conduct and ethics",
    "What's our diversity and inclusion policy?",
    "What are the emergency procedures?",
    "How does our creative development process work?"
  ],
  'HR Questions': [
    "What's our parental leave policy?",
    "How does the hybrid work policy work?",
    "What's our compensation philosophy?",
    "What are the working hours and overtime rules?",
    "How do I report workplace issues?",
    "What learning and development programs are available?"
  ],
  'IT Support': [
    "What technology equipment do I get?",
    "What's our data security policy?",
    "How often do we refresh equipment?",
    "What software licenses are provided?",
    "What are the VPN and security requirements?",
    "How do I get IT support?"
  ],
  'Benefits': [
    "What health and wellness benefits do we have?",
    "How does our 401k retirement plan work?",
    "What's our tuition reimbursement program?",
    "What office amenities are available?",
    "What's the learning budget per employee?",
    "Do we have gym membership reimbursement?"
  ]
};

export const SampleQuestions: React.FC<SampleQuestionsProps> = ({
  selectedTopic,
  onQuickAction,
  onBack
}) => {
  const questions = topicQuestions[selectedTopic as keyof typeof topicQuestions] || [];

  return (
    <div className="max-w-2xl mx-auto mb-6">
      <div 
        className="rounded-lg p-4 border border-gray-600"
        style={{ backgroundColor: colors.grayMedium }}
      >
        <h4 
          className="text-sm font-medium mb-3 text-center flex items-center justify-center"
          style={{ color: colors.primary }}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Sample questions for {selectedTopic}:
        </h4>
        
        <div className="grid grid-cols-1 gap-2">
          {questions.map((question, index) => (
            <button
              key={index}
              onClick={() => onQuickAction(question)}
              className="text-left p-3 border border-gray-600 rounded-lg text-gray-300 hover:text-white text-sm transition-all duration-200 group"
              style={{ backgroundColor: colors.grayDark }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.grayMedium;
                e.currentTarget.style.borderColor = colors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.grayDark;
                e.currentTarget.style.borderColor = '#4b5563';
              }}
            >
              <div className="flex items-center justify-between">
                <span>{question}</span>
                <svg 
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  style={{ color: colors.primary }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
            </button>
          ))}
        </div>
        
        <button
          onClick={onBack}
          className="mt-3 w-full text-center text-xs text-gray-400 hover:text-gray-300 transition-colors"
        >
          ← Back to all topics
        </button>
      </div>
    </div>
  );
};