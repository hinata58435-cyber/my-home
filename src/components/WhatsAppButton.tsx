import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/data/store';

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل عبر واتساب"
      className="group fixed bottom-6 left-6 z-40 flex items-center gap-2"
    >
      <span className="hidden rounded-full bg-white px-4 py-2 text-sm font-bold text-dark shadow-card transition-all group-hover:bg-sage-50 sm:block">
        تواصل عبر واتساب
      </span>
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform group-hover:scale-110">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
        <MessageCircle className="relative h-7 w-7" fill="currentColor" stroke="none" />
      </span>
    </a>
  );
}
