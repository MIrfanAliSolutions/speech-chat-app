import MarkdownRenderer from './MarkdownRenderer';

export default function Message({ user, text }) {
  const isAssistant = user === 'assistant';

  return (
    <div
      className={`my-2 flex items-start gap-3 ${
        isAssistant ? 'justify-start' : 'justify-end'
      }`}
    >
      {isAssistant && (
        <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center mt-1.5">
          <img src="/ai.png" alt="AI Avatar" className="w-7 object-cover" />
        </div>
      )}

      <div
        className={`text-base mb-3 ${
          isAssistant
            ? 'text-white w-full rounded-3xl'
            : 'bg-[#242424]/80 w-max text-white rounded-3xl py-3 px-5'
        }`}
      >
        {isAssistant ? <MarkdownRenderer content={text} /> : <p className='userMessage'>{text}</p>}
      </div>
    </div>
  );
}
