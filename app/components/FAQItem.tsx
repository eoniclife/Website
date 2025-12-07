import { ReactNode } from 'react';
import Button from './Button';

interface FAQItemProps {
  id: string;
  question: string;
  children: ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function FAQItem({
  id,
  question,
  children,
  isExpanded,
  onToggle,
}: FAQItemProps) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <button
        type="button"
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        aria-expanded={isExpanded}
        aria-controls={`${id}-content`}
        onClick={onToggle}
      >
        <span className="text-lg font-semibold text-slate-900">{question}</span>
        <Button
          type="button"
          variant="outline"
          className={`w-10 h-10 p-0 rounded-full flex items-center justify-center text-lg font-bold shadow-none border-slate-200 ${
            isExpanded ? 'bg-slate-100' : ''
          }`}
        >
          {isExpanded ? '−' : '+'}
        </Button>
      </button>

      {isExpanded && (
        <div
          id={`${id}-content`}
          className="px-5 pb-5 pt-1 text-sm text-slate-700 leading-relaxed bg-slate-50 border-t border-slate-100"
        >
          {children}
        </div>
      )}
    </div>
  );
}
