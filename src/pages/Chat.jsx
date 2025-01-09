import React, { useState } from 'react';
import Message from '../componsnets/chat/Message';
import ChatInput from '../componsnets/chat/ChatInput';

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'user',
      text: 'Et libero accusamus deleniti odit repellat alias, voluptatum repudiandae ad vitae sapiente velit aliquam iusto ut debitis ratione quaerat?',
    },
    {
      id: 2,
      user: 'assistant',
      text: `
# Hello World

This is some **Markdown** text to test rendering. Here are a few elements:

- **Bold text**: **bold**
- _Italic text_: *italic*
- A [link](https://openai.com)

## Code Block

\`\`\`js
function greet(name) {
  console.log(\`Hello, Chat!\`);
}
greet("World");
\`\`\`

### Unordered List

- Item 1
- Item 2
- Item 3

> This is a blockquote.
# Example

Inline code: \`const x = 42;\`

\`\`\`js
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
\`\`\`

Enjoy testing Markdown!
`,
    },
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-black/80">
      {/* Chat header */}
      <div className="w-full bg-black/90">
        <div className="p-4 max-w-7xl mx-auto shadow text-white">
          <h1 className="text-xl font-bold">Speech Chat App</h1>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 flex flex-col">
        <div className="overflow-y-auto p-4 chatMessages">
          {messages.map((msg) => (
            <Message key={msg.id} user={msg.user} text={msg.text} />
          ))}
        </div>

        {/* Input section */}
        <ChatInput
          onSend={(value) =>
            setMessages([
              ...messages,
              {
                id: messages?.[messages.length - 1]?.id + 1 || 1,
                user: 'user',
                text: value,
              },
            ])
          }
        />
      </div>
    </div>
  );
}
