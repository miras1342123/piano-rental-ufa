import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function AccordionItem({ question, answer, isOpen = false, onToggle }: AccordionItemProps) {
  const [internalOpen, setInternalOpen] = useState(isOpen);
  const open = onToggle ? isOpen : internalOpen;
  const toggle = onToggle || (() => setInternalOpen(!internalOpen));

  return (
    <div className="border-b border-graphite/10">
      <button
        className="w-full flex justify-between items-center gap-4 py-5 text-left text-graphite font-medium hover:text-brass transition-colors duration-300"
        onClick={toggle}
      >
        <span className="text-lg sm:text-xl">{question}</span>
        <span
          className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ease-premium ${
            open ? 'bg-brass text-white' : 'bg-graphite/5 text-graphite'
          }`}
        >
          <ChevronDown
            size={20}
            className={`transition-transform duration-300 ease-premium ${open ? 'rotate-180' : ''}`}
          />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-premium ${
          open ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <p className="text-graphite/70 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}