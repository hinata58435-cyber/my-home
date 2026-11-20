import { useEffect, useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Check } from 'lucide-react';
import type { Product } from '@/data/products';
import { categoryLabel } from '@/data/products';
import { formatSARWithCurrency } from '@/utils/format';
import StarRating from '@/components/StarRating';

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAdd: (id: string, qty: number) => void;
}

export default function QuickView({ product, onClose, onAdd }: QuickViewProps) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setQty(1);
    setAdded(false);
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (product) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product) return null;

  const add = () => {
    onAdd(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-dark/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative grid w-full max-w-3xl animate-scale-in overflow-hidden rounded-3xl bg-ivory shadow-lift md:grid-cols-2">
        <button
          onClick={onClose}
          className="absolute left-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-xl bg-white/90 text-dark shadow-soft hover:bg-sage-50"
          aria-label="إغلاق"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="aspect-square overflow-hidden bg-beige-100 md:aspect-auto">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <span className="text-xs font-bold text-sage-500">{categoryLabel(product.category)}</span>
          <h3 className="mt-1 font-display text-2xl font-bold text-dark">{product.name}</h3>
          <div className="mt-2 flex items-center gap-2">
            <StarRating value={product.rating} />
            <span className="text-sm text-dark/50">({product.reviews} تقييم)</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-dark/70">{product.description}</p>

          <div className="mt-5 flex items-end gap-3">
            <span className="font-display text-2xl font-bold text-sage-600">{formatSARWithCurrency(product.price)}</span>
            {product.oldPrice && (
              <span className="text-base text-dark/40 line-through">{formatSARWithCurrency(product.oldPrice)}</span>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-sm font-bold text-dark">الكمية</span>
            <div className="flex items-center gap-1 rounded-full bg-white p-1 shadow-soft">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-8 w-8 place-items-center rounded-full bg-beige-100 hover:bg-sage-100" aria-label="إنقاص">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-bold text-dark">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="grid h-8 w-8 place-items-center rounded-full bg-beige-100 hover:bg-sage-100" aria-label="زيادة">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <button onClick={add} className={`mt-6 w-full ${added ? 'btn-wood' : 'btn-primary'}`}>
            {added ? (<><Check className="h-5 w-5" /> تمت الإضافة</>) : (<><ShoppingBag className="h-5 w-5" /> أضف إلى السلة</>)}
          </button>
        </div>
      </div>
    </div>
  );
}
