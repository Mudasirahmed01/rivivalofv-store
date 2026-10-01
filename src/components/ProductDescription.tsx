import ReactMarkdown from 'react-markdown';

export default function ProductDescription({ content }: { content: string }) {
  return <div className="product-description text-sm md:text-base text-[#6E6E73] leading-relaxed">
    <ReactMarkdown components={{
      h2: ({ ...props }) => <h2 className="mb-2 mt-5 text-lg font-bold text-[#111] md:text-xl" {...props} />,
      h3: ({ ...props }) => <h3 className="mb-2 mt-4 text-base font-semibold text-[#111] md:text-lg" {...props} />,
      p: ({ ...props }) => <p className="mb-3" {...props} />,
      ul: ({ ...props }) => <ul className="mb-4 list-disc space-y-1 pl-5" {...props} />,
      ol: ({ ...props }) => <ol className="mb-4 list-decimal space-y-1 pl-5" {...props} />,
      blockquote: ({ ...props }) => <blockquote className="my-4 border-l-2 border-black/20 pl-4 italic" {...props} />,
      a: ({ ...props }) => <a className="text-blue-700 underline underline-offset-2" target="_blank" rel="noreferrer" {...props} />,
    }}>{content}</ReactMarkdown>
  </div>;
}