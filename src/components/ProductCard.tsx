import { ShoppingBag, Eye } from 'lucide-react';
import type { Product } from '@/data/products';
import { categoryLabel } from '@/data/products';
import { formatSARWithCurrency, formatSAR } from '@/utils/format';
import StarRating from '@/components/StarRating';

interface ProductCardProps {
  product: Product;
  onAdd: (id: string) => void;
  onQuickView: (product: Product) => void;
  added?: boolean;
}

export default function ProductCard({ product, onAdd, onQuickView, added }: ProductCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="relative aspect-[4/5] overflow-hidden bg-beige-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-3 right-3 rounded-full bg-sage-400 px-3 py-1 text-xs font-bold text-white shadow-soft">
            {product.badge}
          </span>
        )}
        {product.oldPrice && (
          <span className="absolute top-3 left-3 rounded-full bg-wood px-3 py-1 text-xs font-bold text-white shadow-soft">
            خصم {Math.round((1 - product.price / product.oldPrice) * 100)}%
          </span>
        )}
        <button
          onClick={() => onQuickView(product)}
          className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center justify-center gap-2 rounded-full bg-white/95 py-2.5 text-sm font-bold text-dark opacity-0 shadow-soft backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Eye className="h-4 w-4" />
          عرض المنتج
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-bold text-sage-500">{categoryLabel(product.category)}</span>
        <h3 className="mt-1 font-display text-base font-bold leading-snug text-dark">{product.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-dark/60">{product.description}</p>

        <div className="mt-2 flex items-center gap-2">
          <StarRating value={product.rating} size={14} />
          <span className="text-xs text-dark/50">({product.reviews})</span>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-xs text-dark/40 line-through">{formatSAR(product.oldPrice)} ر.س</span>
            )}
            <span className="font-display text-lg font-bold text-sage-600">
              {formatSARWithCurrency(product.price)}
            </span>
          </div>
          <button
            onClick={() => onAdd(product.id)}
            className={`grid h-11 w-11 place-items-center rounded-2xl shadow-soft transition-all hover:scale-105 ${
              added ? 'bg-sage-600 text-white' : 'bg-sage-400 text-white hover:bg-sage-500'
            }`}
            aria-label="أضف إلى السلة"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
}
