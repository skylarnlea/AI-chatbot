// src/components/welcome/WelcomeScreen.tsx
import React from 'react';
import { colors } from '@/styles/colors';
import { TopicBadges } from './TopicBadges';
import { QuickActions } from './QuickActions';
import { SampleQuestions } from './SampleQuestions';

interface WelcomeScreenProps {
  selectedTopic: string | null;
  onTopicClick: (topicName: string) => void;
  onQuickAction: (action: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  selectedTopic,
  onTopicClick,
  onQuickAction
}) => {
  return (
    <div className="text-center text-gray-400 mt-16">
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
        style={{ backgroundColor: colors.grayMedium }}
      >
        <svg 
          className="w-8 h-8" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          style={{ color: colors.primary }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-200 mb-2">Start a conversation</h3>
      <p className="text-gray-400 mb-6 max-w-md mx-auto">
        Ask me anything about company policies, HR questions, IT support, or general workplace information.
      </p>
      
      <TopicBadges 
        selectedTopic={selectedTopic}
        onTopicClick={onTopicClick}
      />
      
      {selectedTopic ? (
        <SampleQuestions 
          selectedTopic={selectedTopic}
          onQuickAction={onQuickAction}
          onBack={() => onTopicClick(selectedTopic)}
        />
      ) : (
        <QuickActions onQuickAction={onQuickAction} />
      )}
    </div>
  );
};