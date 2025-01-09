import React, { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai'; // Optional: an icon for the send button

export default function ChatInput({ onSend }) {
  const [message, setMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
  };

  return (
    <form
      onSubmit={handleSend}
      className="w-full flex items-center bg-black/50 rounded-2xl"
    >
      <textarea
        rows={1}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 resize-none  p-5 focus:outline-none bg-transparent transition-colors placeholder:text-white text-white scrollbar-thin scrollbar-track-transparent scrollbar-thumb-rounded-md"
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
