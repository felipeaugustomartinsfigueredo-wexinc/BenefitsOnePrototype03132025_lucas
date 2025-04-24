import React, { useState, useRef, useEffect } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { MessageSquare, X, Send } from 'lucide-react';
import { Card } from '../ui/Card';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string | React.ReactNode;
  timestamp: Date;
}

interface ChatButtonProps {
  unreadCount?: number;
  onClick: () => void;
}

interface PageInfo {
  name: string;
  path: string;
  description: string;
  features: string[];
}

interface TopicGroup {
  title: string;
  topics: PageInfo[];
}

const topicGroups: TopicGroup[] = [
  {
    title: 'My Benefits',
    topics: [
      {
        name: 'Medical Benefits',
        path: '/health/medical',
        description: 'Your medical benefits include comprehensive healthcare coverage with multiple plan options.',
        features: [
          'Premium PPO plan with $1,000 deductible and $3,000 out-of-pocket maximum',
          'Standard PPO plan with $2,000 deductible and $4,000 out-of-pocket maximum',
          'High Deductible Health Plan (HDHP) option with HSA compatibility',
          'Copays starting at $20 for primary care and $40 for specialists',
          'Prescription drug coverage with tiered copays ($10/$30/$50)',
          'Preventive care covered at 100%',
          'Virtual doctor visits available',
          'Nationwide network of providers'
        ]
      },
      {
        name: 'Dental Benefits',
        path: '/health/dental',
        description: 'Your dental coverage includes preventive, basic, and major services.',
        features: [
          'Premium Dental plan with $50 deductible and $2,000 annual maximum',
          '100% coverage for preventive care',
          '80% coverage for basic services',
          '50% coverage for major services',
          'Orthodontia coverage up to $1,500',
          'No waiting period for preventive services',
          'Large network of dental providers'
        ]
      },
      {
        name: 'Vision Benefits',
        path: '/health/vision',
        description: 'Your vision plan covers eye exams, glasses, and contact lenses.',
        features: [
          'Annual eye exam with $10 copay',
          '$200 frame allowance every 24 months',
          'Contact lens allowance of $150',
          'Lens copay of $20',
          'Additional discounts on lens upgrades',
          'Large network of vision providers',
          'Discounts on LASIK surgery'
        ]
      },
      {
        name: 'Life Insurance',
        path: '/health/life',
        description: 'Your life insurance benefits provide financial protection for your loved ones.',
        features: [
          'Company-paid basic life insurance of $50,000',
          'Optional supplemental coverage available',
          'Spouse and dependent coverage options',
          'Accelerated death benefit included',
          'Conversion privileges available',
          'Portable coverage options',
          'Will preparation services included'
        ]
      },
      {
        name: 'Disability Benefits',
        path: '/health/disability',
        description: 'Your disability coverage provides income protection if you become unable to work.',
        features: [
          'Short-term disability with 60% income replacement',
          'Long-term disability coverage available',
          'Maximum benefit of $1,500 per week for STD',
          '7-day elimination period',
          '26-week benefit duration',
          'Rehabilitation services included',
          'Partial disability benefits available'
        ]
      }
    ]
  },
  {
    title: 'HSA Management',
    topics: [
      {
        name: 'HSA Account',
        path: '/hsa/account',
        description: 'Your Health Savings Account helps you save for medical expenses tax-free.',
        features: [
          'Current balance tracking',
          'Contribution management',
          'Tax advantages on contributions',
          'Investment options available',
          'Easy claims submission',
          'Mobile app access',
          'Employer contributions available'
        ]
      },
      {
        name: 'HSA Investments',
        path: '/hsa/investments',
        description: 'Grow your HSA funds through investment options.',
        features: [
          'Multiple investment options available',
          'Real-time portfolio tracking',
          'Investment performance monitoring',
          'Automatic rebalancing options',
          'Low-cost index funds',
          'Professional investment guidance',
          'Mobile investment management'
        ]
      }
    ]
  },
  {
    title: 'Claims & Payments',
    topics: [
      {
        name: 'Claims',
        path: '/hsa/claims',
        description: 'Manage and submit your healthcare claims easily.',
        features: [
          'Online claims submission',
          'Receipt upload capability',
          'Claim status tracking',
          'Reimbursement management',
          'Historical claims view',
          'Mobile claims submission',
          'Automated claims processing'
        ]
      },
      {
        name: 'COBRA Payments',
        path: '/cobra/payments',
        description: 'Manage your COBRA continuation coverage payments.',
        features: [
          'Online payment processing',
          'Automatic payment setup',
          'Payment history tracking',
          'Coverage period management',
          'Payment reminders',
          'Multiple payment methods',
          'Real-time payment confirmation'
        ]
      }
    ]
  },
  {
    title: 'Family Management',
    topics: [
      {
        name: 'Dependents',
        path: '/dependents',
        description: 'Manage your covered dependents and their benefits.',
        features: [
          'Add or remove dependents',
          'Update dependent information',
          'Coverage verification',
          'Dependent eligibility tracking',
          'Document upload capability',
          'Coverage effective dates management',
          'Dependent status updates'
        ]
      }
    ]
  }
];

// Create a flat map of all topics for easy lookup
const pagesInfo: Record<string, PageInfo> = Object.fromEntries(
  topicGroups.flatMap(group => 
    group.topics.map(topic => [topic.name, topic])
  )
);

const ChatButton: React.FC<ChatButtonProps> = ({ unreadCount, onClick }) => {
  const { theme, isDarkMode } = useThemeStore();

  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}
      style={{ backgroundColor: theme.colors.primary.teal }}
    >
      <MessageSquare className="w-6 h-6 text-white" />
      {unreadCount && unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </button>
  );
};

export const ChatInterface: React.FC = () => {
  const { theme, isDarkMode } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: '1',
          type: 'bot',
          content: (
            <div className="space-y-4">
              <p>Hi Consumer, I'm Benny Cardman Let's Chat a virtual assistant. Start by asking me a question or you can click the button below for a list of popular topics. Protect your privacy and never disclose sensitive data such as passwords or SSN.</p>
              <button
                onClick={() => handleShowTopics()}
                className="px-4 py-2 rounded-lg text-white text-sm transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: theme.colors.primary.teal }}
              >
                See what you can ask me
              </button>
            </div>
          ),
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleShowTopics = () => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'bot',
      content: (
        <div className="space-y-4">
          <p className="mb-2">Here are the topics I can help you with:</p>
          {topicGroups.map((group) => (
            <div key={group.title} className="space-y-2">
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {group.title}
              </p>
              <div className="grid grid-cols-1 gap-2">
                {group.topics.map((topic) => (
                  <button
                    key={topic.path}
                    onClick={() => handleTopicSelect(topic.name)}
                    className={`p-2 text-left rounded-lg text-sm transition-colors ${
                      isDarkMode
                        ? 'bg-gray-700 hover:bg-gray-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {topic.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
      timestamp: new Date(),
    }]);
  };

  const handleTopicSelect = (topic: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'user',
      content: `Tell me about ${topic}`,
      timestamp: new Date(),
    }]);

    const pageInfo = pagesInfo[topic];
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        content: (
          <div className="space-y-4">
            <p>{pageInfo.description}</p>
            <div className="space-y-2">
              <p className="font-medium">Key Features:</p>
              <ul className="list-disc pl-4 space-y-1">
                {pageInfo.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <p className="text-sm">
              You can access these benefits by visiting the {topic} page in your portal.
            </p>
          </div>
        ),
        timestamp: new Date(),
      }]);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userQuestion = inputValue.toLowerCase();
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    }]);

    setInputValue('');

    // Find matching topic based on keywords
    const matchingTopic = Object.entries(pagesInfo).find(([name, info]) => 
      userQuestion.includes(name.toLowerCase()) ||
      info.features.some(feature => userQuestion.includes(feature.toLowerCase()))
    );

    setTimeout(() => {
      if (matchingTopic) {
        handleTopicSelect(matchingTopic[0]);
      } else {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          type: 'bot',
          content: "I'm not sure about that specific question. Would you like to see a list of topics I can help you with?",
          timestamp: new Date(),
        }]);
      }
    }, 1000);
  };

  return (
    <>
      <ChatButton onClick={() => setIsOpen(true)} />

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 z-50" ref={chatRef}>
          <Card className="flex flex-col h-[600px]">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: theme.colors.primary.teal + '15' }}
                >
                  <MessageSquare 
                    className="w-6 h-6"
                    style={{ color: theme.colors.primary.teal }}
                  />
                </div>
                <div>
                  <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Benny Cardman
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Virtual Assistant
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? isDarkMode
                          ? 'bg-teal-900/30 text-white'
                          : 'bg-teal-50 text-gray-900'
                        : isDarkMode
                        ? 'bg-gray-700 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className={`w-full px-4 py-2 pr-10 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'border-gray-200 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 p-1 rounded-lg transition-colors"
                  style={{ color: theme.colors.primary.teal }}
                  disabled={!inputValue.trim()}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </>
  );
};