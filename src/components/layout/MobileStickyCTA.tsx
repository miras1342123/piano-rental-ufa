import { Phone, Send } from 'lucide-react';
import { contacts } from '../../data/contacts';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export default function MobileStickyCTA() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (!isMobile) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-graphite/10 px-4 py-3 flex justify-around items-center z-40 shadow-lg">
      <a
        href={`tel:${contacts.phone}`}
        className="flex flex-col items-center text-graphite/70 hover:text-brass transition-colors"
      >
        <Phone size={22} />
        <span className="text-xs mt-1">Позвонить</span>
      </a>
      {contacts.telegram && (
        <a
          href={contacts.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-graphite/70 hover:text-brass transition-colors"
        >
          <Send size={22} />
          <span className="text-xs mt-1">Telegram</span>
        </a>
      )}
    </div>
  );
}