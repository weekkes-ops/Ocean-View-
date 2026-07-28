import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, RefreshCw, X, Lightbulb } from 'lucide-react';
import { ResortSummaryStats } from '../types';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: ResortSummaryStats;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  stats,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `Greetings! I am **Aura**, your Chief AI Operations & Hospitality Assistant for **OceanView Country Club & Resort** (Sussex Village).\n\nHow can I assist you with guest experience, staff dispatch, event planning, or revenue optimization today?`,
      time: 'Just now',
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'Draft VIP Welcome Email for Dr. Samuel Cole in Villa 01',
    'Generate a 1-day Sunset Itinerary with Jet Skis & VIP Lounge',
    'Recommend weekend pricing strategy to maximize villa revenue',
    'Suggest gala menu and wine pairings for 150-person beach wedding',
    'Draft polite response for late check-out extension request',
  ];

  const handleSend = async (promptToSend?: string) => {
    const text = promptToSend || inputPrompt;
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!promptToSend) setInputPrompt('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          context: { stats },
        }),
      });

      const data = await res.json();
      const aiReply = data.reply || 'I am currently reviewing resort operations. How else can I assist?';

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: 'I encountered a brief connection issue. Please verify process.env.GEMINI_API_KEY in Secrets or try again.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 p-0.5 shadow-md shadow-orange-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-orange-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-sm">Aura AI Resort Assistant</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-950 text-orange-300 border border-orange-800">
                  Gemini Flash 3.6
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Sussex Village Operations & Concierge Intelligence</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-900/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-orange-950 text-orange-400 border border-orange-800/80 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-xs space-y-1 ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white rounded-tr-none shadow-md font-medium'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-line leading-relaxed shadow-md'
                }`}
              >
                <p>{m.text}</p>
                <span className={`text-[10px] block text-right mt-1 ${m.sender === 'user' ? 'text-cyan-200' : 'text-slate-500'}`}>
                  {m.time}
                </span>
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-orange-400 bg-slate-950 p-3 rounded-xl border border-slate-800 w-fit">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Aura is drafting response...</span>
            </div>
          )}
        </div>

        {/* Quick Prompt Chips */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 overflow-x-auto flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 shrink-0">
            <Lightbulb className="w-3 h-3 text-amber-400" /> Prompts:
          </span>
          {quickPrompts.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              disabled={isLoading}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-lg text-[11px] whitespace-nowrap transition-colors shrink-0"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask Aura about room availability, staff tasks, email drafts, menus..."
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              disabled={isLoading || !inputPrompt.trim()}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
