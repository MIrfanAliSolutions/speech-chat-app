import { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';

export default function ChatInput({ onSend, heightChange }) {
  const [message, setMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
    if (e.target.elements?.userMessage) {
      e.target.elements.userMessage.style.height = 'auto';
    }
  };

  const handleChange = (e) => {
    const textarea = e.target;
    setMessage(textarea.value);
    textarea.style.height = 'auto';
    const scrollHeight = textarea.scrollHeight;
    const maxHeight = 200;
    textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px';
    heightChange(textarea.style.height?.split('px')[0]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <form
      onSubmit={handleSend}
      className="w-full flex items-center bg-black/50 rounded-2xl"
    >
      <textarea
        name="userMessage" // easier to access from handleSend if needed
        rows={1}
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="flex-1 resize-none p-5 focus:outline-none bg-transparent placeholder:text-white text-white scrollbar-thin scrollbar-track-transparent scrollbar-thumb-rounded-md max-h-[200px] overflow-y-auto"
        placeholder="Send a message..."
      />

      <button
        type="submit"
        className="inline-flex items-center p-5 rounded-md focus:outline-none transition-colors"
      >
        <AiOutlineSend className="w-6 h-6 text-white -rotate-45" />
      </button>
    </form>
  );
}
