import React, { useState, useEffect, useRef } from 'react';
import { CircleP, SendIcon, CloseIcon } from './Icons';
import SuccessMessage from './SuccessMessage';
import ContactForm from './ContactForm';
import OpenAI from "openai";
import '../styles/index.css';

function ChatWindow({ onClose }) {
  const [chatState, setChatState] = useState('initial');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingMessage, setCurrentTypingMessage] = useState(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const messagesEndRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const inputRef = useRef(null); // Ref for the input field
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const outerHeightClass = chatState === 'ai' ? 'h-[500px] sm:h-[567px]' : 'h-auto min-h-[500px] sm:min-h-[567px]';

  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  const systemMessage = {
    role: "system",
    content: "You are Prince Bot, an AI assistant specialized in real estate inquiries. Provide helpful and concise responses."
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, displayedText]);

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Auto-focus input when chatState is 'ai' and the input is ready
  useEffect(() => {
    if (chatState === 'ai' && inputRef.current && !isTyping) {
      inputRef.current.focus();
    }
  }, [chatState, isTyping]); // Depend on chatState and isTyping to re-focus after typing ends

  const typeMessage = (text, messageId) => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    setIsTyping(true);
    setDisplayedText('');
    let i = 0;
    const speed = 25;

    typingIntervalRef.current = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
        setIsTyping(false);
        setMessages(prev => [...prev, { id: messageId, text: text, isBot: true }]);
        setCurrentTypingMessage(null);
        setDisplayedText('');
      }
    }, speed);
  };

  const getAIResponse = async (userMessages) => {
    try {
      const conversation = [systemMessage, ...userMessages];
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: conversation,
      });
      return response.choices[0].message.content;
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Sorry, I couldn't process your request. Please try again.";
    }
  };

  const startAIChat = async () => {
    setChatState('ai');
    setIsTyping(true);

    const response = await getAIResponse([]);
    const botMessageId = Date.now();
    setCurrentTypingMessage({ id: botMessageId });
    typeMessage(response, botMessageId);
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMessage = { id: Date.now(), text: input, isBot: false };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    const userMessagesForAPI = newMessages.map(msg => ({
      role: msg.isBot ? "assistant" : "user",
      content: msg.text
    }));

    getAIResponse(userMessagesForAPI).then(response => {
      const botMessageId = Date.now() + 1;
      setCurrentTypingMessage({ id: botMessageId });
      typeMessage(response, botMessageId);
    });
  };

  const startAgentChat = () => {
    setChatState('agent');
  };

  const handleFormSubmit = (formData) => {
    console.log('Form submitted:', formData);
    setChatState('success');
  };

  const goToHome = () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    setChatState('initial');
    setMessages([]);
    setInput('');
    setIsTyping(false);
    setCurrentTypingMessage(null);
    setDisplayedText('');
  };

  return (
    <div
      className={`w-full custom-scrollbar max-w-[406px] ${chatState === 'initial' ? 'bg-transparent' : 'bg-[#202020]'} ${outerHeightClass} rounded-[18.389px] border-solid border-[2px] border-[#FCC201] relative overflow-hidden flex flex-col mx-auto`}
    >
      {chatState !== 'initial' && (
        <div className="flex items-center justify-between p-4 border-b border-[#FCC201]/30">
          <div className="flex items-center gap-3">
            <CircleP className="w-8 h-8" />
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-semibold text-white font-['Montserrat']">Prince Bot</h2>
                <div className="relative flex h-2 w-2">
                  <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-[#FCC201] opacity-75"></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isOnline ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                </div>
              </div>
              <p className="text-sm text-gray-400 font-['Lexend']">AI powered virtual assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#FCC201] hover:text-[#E5AC00]"
            aria-label="Close chat"
          >
            <CloseIcon />
          </button>
        </div>
      )}

      {chatState === 'initial' && (
        <div className="relative flex-1 flex flex-col items-center overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-3/4 bg-[url('../assets/bc3.jpg')] bg-center bg-cover brightness-125 before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-75"></div>
          <div className="absolute bottom-0 left-0 w-full h-[58.5%] sm:h-[51%] bg-black border-t-2 border-[#FCC201]"
            style={{
              borderTopLeftRadius: '50% 15%',
              borderTopRightRadius: '50% 15%',
              transform: 'translateY(10%)',
              outline: "2px solid #FCC201"
            }}>
          </div>
          <div className="relative w-full h-full flex flex-col items-center z-10 px-4 sm:px-6 py-6 sm:py-8">
            <div className="flex flex-col items-center w-full">
              <span className="font-['Montserrat'] text-[24px] font-bold leading-[29px] text-[#fff] text-center mt-[40px] sm:mt-[60px]">
                Unleash the power of
              </span>
              <div className="flex w-full max-w-[176px] h-[4px] justify-between items-center mt-[6.379px]">
                <div className="w-[4px] h-[4px] shrink-0 bg-[#FCC201] rounded-[50%]" />
                <div className="w-[4px] h-[4px] shrink-0 bg-[#FCC201] rounded-[50%]" />
              </div>
              <div className="flex w-full max-w-[172px] h-[39px] justify-center items-center bg-[#000] border-solid border-[0.5px] border-[#645a5a] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] mt-[-0.62px]">
                <span className="font-['Montserrat'] text-[24px] font-bold text-[#FCC201] text-center">
                  Prince Bot
                </span>
              </div>
              <div className="flex w-full max-w-[176px] h-[4px] justify-between items-center mt-[-0.62px]">
                <div className="w-[4px] h-[4px] shrink-0 bg-[#FCC201] rounded-[50%]" />
                <div className="w-[4px] h-[4px] shrink-0 bg-[#FCC201] rounded-[50%]" />
              </div>
              <span className="font-['Lexend'] text-sm sm:text-[14.77px] font-extralight text-[#fff] text-center mt-[6.379px] max-w-[300px]">
                AI powered expertise for Real Estate Success
              </span>
            </div>
            <div className="w-[70px] h-[70px] sm:w-[83.514px] sm:h-[83.514px] bg-[#000000] border-[#FCC201] rounded-full border-2 mt-[30px] sm:mt-[45.379px] relative glow-effect">
              <span className="flex w-full h-full justify-center items-center font-['League_Spartan'] text-[40px] sm:text-[48px] font-bold text-[#FCC201] text-center">
                P
              </span>
              <div className="w-full h-full border-[#FCC201] bg-[#000000] rounded-[50%] absolute top-0 left-0 opacity-20" />
            </div>
            <span
              onClick={startAIChat}
              className="cursor-pointer font-['Lexend'] text-lg sm:text-[20px] font-extralight text-[#fff] text-center mt-[30px] sm:mt-[19.865px]"
            >
              Get Started
            </span>
            <div className="flex flex-col items-center w-full max-w-[300px] mt-[15px] sm:mt-[18.379px]">
              <div
                onClick={startAIChat}
                className="cursor-pointer w-full max-w-[204.475px] h-[48.475px] bg-[#242222] rounded-[44.068px] border-solid border-[0.88px] border-[#FCC201] relative"
              >
                <div className="w-[41.424px] h-[41.424px] bg-[url('https://static.codia.ai/image/2025-03-21/10dee7d1-01f3-43cb-9b7d-52affc4e5eea.svg')] bg-cover bg-no-repeat rounded-[50%] absolute top-[2.644px] left-[2.644px]" />
                <div className="w-[25.559px] h-[25.559px] bg-[url('https://static.codia.ai/image/2025-03-21/ddcbe2da-e9dd-4c54-939d-cbd49c930b2d.png')] bg-cover bg-no-repeat absolute top-[10.576px] left-[10.576px]" />
                <span className="flex w-[51px] h-[20px] justify-center items-center font-['Montserrat'] text-[16px] font-medium text-[#fff] absolute top-[13.576px] left-[89.085px] text-center whitespace-nowrap">
                  Ask AI
                </span>
              </div>
              <div
                onClick={startAgentChat}
                className="cursor-pointer w-full max-w-[204.475px] h-[48.475px] bg-[#242222] rounded-[44.068px] border-solid border-[0.88px] border-[#FCC201] mt-[8.379px] relative"
              >
                <div className="w-[41.424px] h-[41.424px] bg-[url('https://static.codia.ai/image/2025-03-21/0431395c-6e2d-4f72-a6c7-280288b07880.svg')] bg-cover bg-no-repeat rounded-[50%] absolute top-[2.644px] left-[2.644px]" />
                <div className="w-[22.915px] h-[22.915px] bg-[url('https://static.codia.ai/image/2025-03-21/45a91602-2248-4267-8f99-17444f869f90.png')] bg-cover bg-no-repeat absolute top-[12.339px] left-[10.576px]" />
                <span className="flex w-[108px] h-[20px] justify-center items-center font-['Montserrat'] text-[16px] font-medium text-[#fff] absolute top-[12.593px] left-[66.119px] text-center whitespace-nowrap">
                  Talk to Agent
                </span>
              </div>
            </div>
            <div className="absolute bottom-0 sm:bottom-1 text-center text-xs text-gray-400 w-full">
              Powered by Kingsmen Technologies
            </div>
          </div>
        </div>
      )}

      {chatState === 'ai' && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${msg.isBot
                    ? 'bg-[#2D2D2D] text-white'
                    : 'bg-[#FCC201] text-black'
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && !currentTypingMessage && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg bg-[#2D2D2D] text-white">
                  Prince Bot is thinking...
                </div>
              </div>
            )}
            {currentTypingMessage && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg bg-[#2D2D2D] text-white">
                  {displayedText}
                  <span className="inline-block w-1.5 h-4 ml-0.5 bg-gray-400 animate-pulse"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-[#FCC201]/30">
            <div className="flex gap-2">
              <input
                type="text"
                ref={inputRef} // Attach ref to input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask anything..."
                className="flex-1 bg-[#2D2D2D] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FCC201]"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                className={`bg-[#FCC201] text-black p-2 rounded-lg transition-colors ${isTyping ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#E5AC00]'}`}
                aria-label="Send message"
                disabled={isTyping}
              >
                <SendIcon />
              </button>
            </div>
          </div>
        </>
      )}

      {chatState === 'agent' && (
        <ContactForm
          onSubmit={handleFormSubmit}
          onBack={goToHome}
        />
      )}

      {chatState === 'success' && (
        <SuccessMessage
          onHome={goToHome}
          onBack={() => setChatState('agent')}
        />
      )}
    </div>
  );
}

export default ChatWindow;