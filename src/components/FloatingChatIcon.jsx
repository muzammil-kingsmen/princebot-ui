import { MessageCircle } from 'lucide-react';

function FloatingChatIcon({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-[#FFC107] rounded-full flex items-center justify-center shadow-lg transition-colors glow-effect z-50"
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      <MessageCircle className="w-6 h-6 text-black" />
    </button>
  );
}

export default FloatingChatIcon;