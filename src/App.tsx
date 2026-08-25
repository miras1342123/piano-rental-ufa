import { useEffect, useState } from 'react';
import Header from './components/layout/Header';
import ScrollProgress from './components/layout/ScrollProgress';
import Hero from './components/sections/Hero';
import StatsStrip from './components/sections/StatsStrip';
import WhyRent from './components/sections/WhyRent';
import PianoCatalog from './components/sections/PianoCatalog';
import Pricing from './components/sections/Pricing';
import Equipment from './components/sections/Equipment';
import TrustMarquee from './components/sections/TrustMarquee';
import RentalSteps from './components/sections/RentalSteps';
import Advantages from './components/sections/Advantages';
import Reviews from './components/sections/Reviews';
import FAQ from './components/sections/FAQ';
import Contract from './components/sections/Contract';
import Location from './components/sections/Location';
import ContactCTA from './components/sections/ContactCTA';
import Footer from './components/layout/Footer';
import MobileStickyCTA from './components/layout/MobileStickyCTA';
import ManagerBubble from './components/layout/ManagerBubble';
import PianoDetailsPage from './components/ui/PianoDetailsPage';
import { pianos } from './data/pianos';
import { restoreScroll } from './utils/scrollMemory';

// Карточка "Подробнее" открывает не всплывающее окно, а полноценную
// страницу модели по адресу вида #piano/yamaha-p35b. Так работает кнопка
// "назад" в браузере, страницу можно дать по прямой ссылке, а самое
// главное — она больше не блокирует прокрутку основного сайта, потому
// что просто заменяет собой весь экран, а не зависает поверх него.
function getSlugFromHash(): string | null {
  const match = window.location.hash.match(/^#piano\/(.+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function App() {
  const [activeSlug, setActiveSlug] = useState<string | null>(() => getSlugFromHash());

  useEffect(() => {
    const onHashChange = () => setActiveSlug(getSlugFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const activePiano = activeSlug ? pianos.find((p) => p.slug === activeSlug) ?? null : null;

  const closeDetails = () => {
    // Возвращаемся туда же, где пользователь был до открытия карточки.
    // Если позиция почему-то не сохранилась — как и раньше, едем к каталогу.
    window.location.hash = '';
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    setActiveSlug(null);
    const savedY = restoreScroll();
    requestAnimationFrame(() => {
      if (savedY !== null) {
        window.scrollTo(0, savedY);
      } else {
        document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  };

  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <StatsStrip />
        <WhyRent />
        <PianoCatalog />
        <Pricing />
        <Equipment />
        <TrustMarquee />
        <RentalSteps />
        <Advantages />
        <Reviews />
        <FAQ />
        <Contract />
        <Location />
        <ContactCTA />
      </main>
      <Footer />
      <MobileStickyCTA />
      <ManagerBubble />
      {activePiano && <PianoDetailsPage piano={activePiano} onClose={closeDetails} />}
    </>
  );
}

export default App;