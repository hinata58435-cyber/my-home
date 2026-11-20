import { useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import type { CartLine } from '@/hooks/useCart';
import { formatSARWithCurrency } from '@/utils/format';
import { navigate } from '@/hooks/useRoute';
import { whatsappLink, WHATSAPP_NUMBER } from '@/data/store';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartLine[];
  subtotal: number;
  count: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export default function CartDrawer({
  open,
  onClose,
  items,
  subtotal,
  count,
  onIncrement,
  onDecrement,
  onRemove,
  onClear,
}: CartDrawerProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const goShop = () => {
    onClose();
    navigate('shop');
  };

  const checkout = () => {
    if (items.length === 0) return;
    const lines = items
      .map((i) => `• ${i.product.name} ×${i.quantity} = ${formatSARWithCurrency(i.lineTotal)}`)
      .join('%0A');
    const msg = `مرحبًا My Home، أرغب في إتمام طلبي:%0A%0A${lines}%0A%0Aالإجمالي: ${formatSARWithCurrency(
      subtotal,
    )}`;
    window.open(whatsappLink(decodeURIComponent(msg)), '_blank');
  };

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-dark/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <aside className="absolute inset-y-0 left-0 flex w-full max-w-md flex-col bg-ivory shadow-lift animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-beige-200 px-6 py-5">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-sage-400 text-white">
              <ShoppingBag className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <h3 className="font-display text-lg font-bold text-dark">سلة المشتريات</h3>
              <p className="text-xs text-dark/60">{count} منتج</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-xl bg-beige-100 text-dark hover:bg-sage-100"
            aria-label="إغلاق"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-beige-100 text-sage-400">
              <ShoppingBag className="h-9 w-9" />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-dark">سلتك فارغة</p>
              <p className="mt-1 text-sm text-dark/60">أضف بعض القطع الجميلة لتبدأ التسوق.</p>
            </div>
            <button onClick={goShop} className="btn-primary">
              تصفّح المتجر
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 rounded-2xl bg-white p-3 shadow-soft"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    loading="lazy"
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold leading-snug text-dark">{item.product.name}</h4>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="shrink-0 text-dark/40 transition-colors hover:text-red-500"
                        aria-label="حذف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-0.5 text-xs text-sage-500">{formatSARWithCurrency(item.product.price)}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full bg-beige-100 p-1">
                        <button
                          onClick={() => onDecrement(item.id)}
                          className="grid h-7 w-7 place-items-center rounded-full bg-white text-dark shadow-sm transition hover:bg-sage-50"
                          aria-label="إنقاص"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-dark">{item.quantity}</span>
                        <button
                          onClick={() => onIncrement(item.id)}
                          className="grid h-7 w-7 place-items-center rounded-full bg-white text-dark shadow-sm transition hover:bg-sage-50"
                          aria-label="زيادة"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-sage-600">{formatSARWithCurrency(item.lineTotal)}</span>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={onClear}
                className="mx-auto mt-2 flex items-center gap-1.5 text-xs font-bold text-dark/50 transition-colors hover:text-red-500"
              >
                <Trash2 className="h-3.5 w-3.5" />
                تفريغ السلة
              </button>
            </div>

            {/* Footer */}
            <div className="border-t border-beige-200 bg-white px-6 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark/70">المجموع الفرعي</span>
                <span className="font-bold text-dark">{formatSARWithCurrency(subtotal)}</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-sm">
                <span className="text-dark/70">الشحن</span>
                <span className="font-bold text-sage-500">يُحدد عند التواصل</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-beige-200 pt-3">
                <span className="font-display text-base font-bold text-dark">الإجمالي</span>
                <span className="font-display text-xl font-bold text-sage-600">{formatSARWithCurrency(subtotal)}</span>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-2.5">
                <button onClick={checkout} className="btn-primary w-full">
                  <CheckCircle2 className="h-5 w-5" />
                  إتمام الطلب عبر واتساب
                </button>
                <button onClick={goShop} className="btn-outline w-full">
                  <ArrowLeft className="h-4 w-4" />
                  متابعة التسوق
                </button>
              </div>
              <p className="mt-3 text-center text-[11px] text-dark/40">
                رقم التواصل: <span dir="ltr">+{WHATSAPP_NUMBER}</span>
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
