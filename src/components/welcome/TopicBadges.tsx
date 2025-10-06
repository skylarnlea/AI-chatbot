// src/components/welcome/TopicBadges.tsx
import React from 'react';
import { colors } from '@/styles/colors';

interface TopicBadgesProps {
  selectedTopic: string | null;
  onTopicClick: (topicName: string) => void;
}

const topics = [
  { name: 'Company Policies' },
  { name: 'HR Questions' },
  { name: 'IT Support' },
  { name: 'Benefits' }
];

export const TopicBadges: React.FC<TopicBadgesProps> = ({
  selectedTopic,
  onTopicClick
}) => {
  return (
    <div className="flex flex-wrap justify-center max-w-lg gap-2 mx-auto mb-6">
      {topics.map((topic) => (
        <button
          key={topic.name}
          onClick={() => onTopicClick(topic.name)}
          className={`px-3 py-1 rounded-full text-sm border transition-all duration-200 ${
            selectedTopic === topic.name ? 'ring-2 ring-accent ring-offset-2 ring-offset-gray-800' : ''
          }`}
          style={{ 
               backgroundColor: colors.primary,
               borderColor: colors.primary,
            color: colors.white
          }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryHover}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
        >
          {topic.name}
        </button>
      ))}
    </div>
  );
};