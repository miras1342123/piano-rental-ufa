import { contacts } from '../../data/contacts';
import { contract } from '../../data/contract';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-graphite/5 border-t border-graphite/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Бренд */}
        <div>
          <span className="text-xl font-heading font-bold text-graphite">
            Piano<span className="text-brass">Rent</span>
          </span>
          <p className="mt-2 text-graphite/60">Аренда цифровых пианино в Уфе</p>
        </div>

        {/* Навигация */}
        <div>
          <h4 className="font-medium text-graphite">Навигация</h4>
          <ul className="mt-2 space-y-1 text-graphite/60">
            <li><a href="#catalog" className="hover:text-brass transition-colors">Пианино</a></li>
            <li><a href="#prices" className="hover:text-brass transition-colors">Цены</a></li>
            <li><a href="#how-it-works" className="hover:text-brass transition-colors">Как арендовать</a></li>
            <li><a href="#faq" className="hover:text-brass transition-colors">FAQ</a></li>
            <li><a href="#contacts" className="hover:text-brass transition-colors">Контакты</a></li>
          </ul>
        </div>

        {/* Контакты и документы */}
        <div>
          <h4 className="font-medium text-graphite">Контакты</h4>
          <ul className="mt-2 space-y-1 text-graphite/60">
            <li><a href={`tel:${contacts.phone}`} className="hover:text-brass transition-colors">{contacts.phone}</a></li>
            <li>{contacts.address}</li>
            <li>
              <a href={contract.pdfUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brass transition-colors">
                Договор аренды
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brass transition-colors">Политика конфиденциальности</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-graphite/10 text-center text-xs text-graphite/40">
        &copy; {currentYear} PianoRent. Все права защищены.
      </div>
    </footer>
  );
}