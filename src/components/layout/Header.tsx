import { useState, useEffect } from 'react';
import { Menu, X, Send } from 'lucide-react';
import Button from '../ui/Button';
import { contacts } from '../../data/contacts';

const navItems = [
  { label: 'Пианино', href: '#catalog' },
  { label: 'Почему аренда', href: '#why-rent' },
  { label: 'Как это работает', href: '#how-it-works' },
  { label: 'Цены', href: '#prices' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Контакты', href: '#contacts' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-premium ${
        isScrolled ? 'bg-cream/80 backdrop-blur-xl shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="/" className="text-xl font-heading font-bold text-graphite tracking-tight">
            Piano<span className="text-brass">Rent</span>
          </a>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-graphite/80">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-brass transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button
              variant="primary"
              size="sm"
              icon={<Send size={16} />}
              onClick={() => window.open(contacts.telegram, '_blank')}
            >
              Написать в Telegram
            </Button>
          </div>

          <button
            className="md:hidden text-graphite p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden fixed inset-0 top-16 bg-cream/95 backdrop-blur-xl transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-start p-6 space-y-6 text-lg font-medium">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-graphite hover:text-brass transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Button
            variant="primary"
            size="md"
            icon={<Send size={18} />}
            className="mt-4"
            onClick={() => {
              setIsMobileMenuOpen(false);
              window.open(contacts.telegram, '_blank');
            }}
          >
            Написать в Telegram
          </Button>
        </div>
      </div>
    </header>
  );
}