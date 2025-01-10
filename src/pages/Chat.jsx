import React, { useState, useEffect, useRef } from 'react';
import Message from '../componsnets/chat/Message';
import ChatInput from '../componsnets/chat/ChatInput';
import useAxios from '../hooks/useAxios';

export default function Chat() {
  const { axiosInstance } = useAxios();
  const messagesEndRef = useRef(null);
  const messagesRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleChatResponse = async (message) => {
    const userMsgId = messages.length
      ? messages[messages.length - 1].id + 1
      : 1;

    setMessages((prev) => [
      ...prev,
      {
        id: userMsgId,
        user: 'user',
        text: message,
      },
    ]);

    const assistantMsgId = userMsgId + 1;
    setMessages((prev) => [
      ...prev,
      {
        id: assistantMsgId,
        user: 'assistant',
        text: '',
      },
    ]);

    try {
      const response = await fetch(
        `${axiosInstance.defaults.baseURL}text-to-text`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: message }),
        }
      );

      if (!response.body) {
        throw new Error('ReadableStream not supported');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const decodedChunk = decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const updated = [...prev];
          const index = updated.findIndex((m) => m.id === assistantMsgId);
          if (index !== -1) {
            updated[index] = {
              ...updated[index],
              text: updated[index].text + decodedChunk,
            };
          }
          return updated;
        });
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMsgId || Date.now(),
          user: 'assistant',
          text: 'Something went wrong while streaming. Please try again.',
        },
      ]);
    }
  };

  const heightChange = (values) => {
    if (+values === 200) return 'calc(100vh - 280px)';
    const height = +values - 64;
    if (+height < 100) return `calc(100vh - ${150 + +height}px)`;
    return `calc(100vh - ${150 + +values}px)`;
  };

  const handleHeightChange = (newInputHeight) => {
    if (messagesRef.current) {
      const newHeight = heightChange(newInputHeight);
      messagesRef.current.style.height = newHeight;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black/80">
      {/* Chat header */}
      <div className="w-full bg-black/90">
        <div className="p-4 max-w-7xl mx-auto shadow text-white">
          <h1 className="text-xl font-bold">Speech Chat App</h1>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 flex flex-col">
        {/* Messages container => attach ref */}
        <div ref={messagesRef} className="overflow-y-auto p-4 chatMessages">
          {messages.map((msg) => (
            <Message key={msg.id} user={msg.user} text={msg.text} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Pass handleHeightChange callback to ChatInput */}
        <ChatInput
          onSend={handleChatResponse}
          heightChange={handleHeightChange}
        />
      </div>
    </div>
  );
}
