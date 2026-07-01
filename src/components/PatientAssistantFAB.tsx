import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export const PatientAssistantFAB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I am your Cerulean AI Assistant. I can help answer questions about your recent lab results or suggest general care routines based on standard medical databases. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMsg.content }),
      });

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          data.reply ||
          "I apologize, but I am having trouble connecting right now.",
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "I encountered an error while trying to process your request. Please try again later.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg text-white transition-all z-50 ${isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100 bg-[#0284c7] hover:bg-[#0369a1]"}`}
        aria-label="Open AI Assistant"
      >
        <MessageSquare size={24} />
      </button>

      <div
        className={`fixed bottom-6 right-6 w-80 md:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col transition-all duration-300 transform origin-bottom-right z-50 overflow-hidden ${isOpen ? "scale-100 opacity-100 pointer-events-auto h-[500px]" : "scale-0 opacity-0 pointer-events-none h-0"}`}
      >
        <div className="bg-[#0284c7] p-4 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <Bot size={20} />
            <h3 className="font-semibold text-lg">Cerulean AI</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-blue-100 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-[#0284c7] text-white" : "bg-[#e0f2fe] text-[#0369a1] dark:bg-slate-700 dark:text-blue-400"}`}
                >
                  {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div
                  className={`px-4 py-2 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-[#0284c7] text-white rounded-tr-sm"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-sm shadow-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-2 max-w-[85%] flex-row">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-[#e0f2fe] text-[#0369a1] dark:bg-slate-700 dark:text-blue-400">
                  <Bot size={16} />
                </div>
                <div className="px-4 py-3 rounded-2xl text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-sm shadow-sm flex items-center gap-1">
                  <span
                    className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about labs, routines..."
              className="flex-1 bg-slate-100 dark:bg-slate-900 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-[#0284c7] dark:text-white"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="w-10 h-10 rounded-full bg-[#0284c7] text-white flex items-center justify-center disabled:opacity-50 hover:bg-[#0369a1] transition-colors shrink-0"
            >
              <Send size={18} className="ml-0.5" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
