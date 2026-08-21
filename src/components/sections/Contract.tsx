import { useRef } from 'react';
import { useInView } from '../../hooks/useInView';
import { contract } from '../../data/contract';
import Button from '../ui/Button';
import { FileText } from 'lucide-react';

export default function Contract() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  const handleOpenContract = () => {
    // Если файл существует, открываем в новой вкладке, иначе показываем уведомление
    if (contract.pdfUrl) {
      window.open(contract.pdfUrl, '_blank');
    } else {
      alert('Договор будет доступен позже.');
    }
  };

  return (
    <section id="contract" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className={`transition-all duration-700 ease-premium ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-graphite leading-tight">
            Договор аренды
          </h2>
          <p className="mt-4 text-lg text-graphite/70">
            Все условия аренды прописаны в договоре. Вы можете ознакомиться с ним до подписания.
          </p>
          <div className="mt-8">
            <Button
              variant="primary"
              size="lg"
              icon={<FileText size={20} />}
              onClick={handleOpenContract}
            >
              Открыть договор
            </Button>
          </div>
          <p className="mt-4 text-sm text-graphite/50">
            Файл в формате PDF. Если документ не открывается, свяжитесь с нами.
          </p>
        </div>
      </div>
    </section>
  );
}