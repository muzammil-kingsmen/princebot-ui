import { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import FloatingChatIcon from './components/FloatingChatIcon';
import './styles/index.css';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const closeChat = (e) => {
    if (e.target.classList.contains('chat-overlay')) {
      setIsChatOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      {isChatOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 chat-overlay z-40"
          onClick={closeChat}
        >
          <div className="fixed bottom-24 right-6 z-50">
            <ChatWindow onClose={() => setIsChatOpen(false)} />
          </div>
        </div>
      )}
      <FloatingChatIcon isOpen={isChatOpen} onClick={toggleChat} />
    </div>
  );
}

export default App;