import React from 'react';
import { Bot } from 'lucide-react';

const ChatbotHeader = () => {
    return (
        <div className="relative z-10 p-4 border-b border-slate-700/50 bg-slate-800/50">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h3 className="text-white font-semibold">Cheil Genie</h3>
                    <p className="text-slate-400 text-sm flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                        Ready to help with your questions
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatbotHeader;