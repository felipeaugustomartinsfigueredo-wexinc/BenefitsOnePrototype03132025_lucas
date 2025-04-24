import React, { useState, useRef, useEffect } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Mic, MicOff, Send, X, MessageSquare } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface GenAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const examplePrompts = [
  {
    category: 'Benefits',
    prompts: [
      "What's my current HSA balance?",
      "When is my next dental cleaning covered?",
      "How do I add a dependent to my health plan?",
      "What's my vision coverage for new glasses?",
    ],
  },
  {
    category: 'Claims',
    prompts: [
      "How do I submit a new medical claim?",
      "What's the status of my recent prescription claim?",
      "Can you explain why my claim was denied?",
      "What documents do I need for claim submission?",
    ],
  },
  {
    category: 'Coverage',
    prompts: [
      "What's my deductible status for the year?",
      "Am I covered for virtual doctor visits?",
      "What specialists are in my network?",
      "How much is my copay for urgent care?",
    ],
  },
];

export const GenAIModal: React.FC<GenAIModalProps> = ({ isOpen, onClose }) => {
  const { theme, isDarkMode } = useThemeStore();
  const [prompt, setPrompt] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isProcessing) return;

    setIsProcessing(true);
    // Here you would integrate with your AI service
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
    setIsProcessing(false);
    setPrompt('');
  };

  const toggleMicrophone = async () => {
    if (!isListening) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Here you would implement speech recognition
        setIsListening(true);
      } catch (err) {
        console.error('Error accessing microphone:', err);
      }
    } else {
      setIsListening(false);
      // Here you would stop speech recognition
    }
  };

  const handleExampleClick = (promptText: string) => {
    setPrompt(promptText);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card ref={modalRef} className="w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6" style={{ color: theme.colors.primary.teal }} />
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              How can I help you?
            </h2>
          </div>
          <Button
            variant="secondary"
            icon={<X className="w-5 h-5" />}
            onClick={onClose}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {examplePrompts.map((category) => (
              <div key={category.category}>
                <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {category.category}
                </h3>
                <div className="space-y-2">
                  {category.prompts.map((promptText) => (
                    <button
                      key={promptText}
                      onClick={() => handleExampleClick(promptText)}
                      className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${
                        isDarkMode
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {promptText}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Ask me anything about your benefits, claims, or account. I'm here to help!
          </p>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <textarea
                ref={inputRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your question or request..."
                className={`w-full px-4 py-3 pr-24 rounded-lg border resize-none ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'border-gray-200 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                rows={3}
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleMicrophone}
                  className={`p-2 rounded-lg transition-colors ${
                    isListening
                      ? 'text-red-500'
                      : isDarkMode
                      ? 'text-gray-400 hover:bg-gray-600'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-5 h-5" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </button>
                <button
                  type="submit"
                  disabled={!prompt.trim() || isProcessing}
                  className={`p-2 rounded-lg transition-colors ${
                    !prompt.trim() || isProcessing
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                  style={{ color: theme.colors.primary.teal }}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};