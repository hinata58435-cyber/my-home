import { CheckCircle2, X } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  message: string | null;
  onDone: () => void;
}

export default function Toast({ message, onDone }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [message, onDone]);

  if (!message) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[90] flex items-center gap-2.5 rounded-2xl bg-dark px-5 py-3.5 text-white shadow-lift animate-fade-up">
      <CheckCircle2 className="h-5 w-5 text-sage-300" />
      <span className="text-sm font-bold">{message}</span>
      <button onClick={onDone} className="mr-1 text-white/50 hover:text-white" aria-label="إغلاق">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
