import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X, Store, CheckCircle2 } from 'lucide-react';
import { PRODUCTS, CATEGORIES, type Category, type Product } from '@/data/products';
import { formatSARWithCurrency } from '@/utils/format';
import ProductCard from '@/components/ProductCard';

interface ShopProps {
  onAdd: (id: string) => void;
  onQuickView: (p: Product) => void;
  cartCount: number;
}

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'المميزة أولًا' },
  { value: 'price-asc', label: 'السعر: من الأقل للأعلى' },
  { value: 'price-desc', label: 'السعر: من الأعلى للأقل' },
  { value: 'rating', label: 'الأعلى تقييمًا' },
];

export default function Shop({ onAdd, onQuickView }: ShopProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [sort, setSort] = useState<SortKey>('featured');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const matchesCat = category === 'all' || p.category === category;
      const matchesQuery =
        query.trim() === '' ||
        p.name.includes(query.trim()) ||
        p.description.includes(query.trim());
      return matchesCat && matchesQuery;
    });

    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        list = [...list].sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
    }
    return list;
  }, [query, category, sort]);

  const handleAdd = (id: string) => {
    onAdd(id);
    setAddedIds((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => setAddedIds((prev) => ({ ...prev, [id]: false })), 1500);
  };

  const activeCount = (category === 'all' ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === category).length);

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-beige-100 to-ivory py-14">
        <div className="container-x">
          <span className="eyebrow"><Store className="h-4 w-4" /> متجر My Home</span>
          <h1 className="mt-3 font-display text-4xl font-bold text-dark sm:text-5xl">تسوّق مجموعاتنا</h1>
          <p className="mt-3 max-w-2xl text-dark/65">اكتشف تشكيلة واسعة من الأثاث والمفروشات المنزلية. استخدم البحث والتصنيفات للوصول لما يناسب بيتك.</p>
        </div>
      </section>

      <section className="container-x mt-10">
        {/* Controls */}
        <div className="card sticky top-24 z-30 flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-dark/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن منتج..."
              className="w-full rounded-2xl border border-beige-200 bg-ivory py-3 pr-12 pl-10 text-sm text-dark placeholder:text-dark/40 focus:border-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-200"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/40 hover:text-dark"
                aria-label="مسح"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative sm:w-60">
            <SlidersHorizontal className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-dark/40" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="w-full appearance-none rounded-2xl border border-beige-200 bg-ivory py-3 pr-11 pl-4 text-sm font-bold text-dark focus:border-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-200"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setCategory('all')}
            className={`chip ${category === 'all' ? 'bg-sage-400 text-white shadow-soft' : 'bg-white text-dark/80 shadow-soft hover:bg-sage-50'}`}
          >
            الكل
            <span className="rounded-full bg-black/10 px-1.5 text-[11px]">{PRODUCTS.length}</span>
          </button>
          {CATEGORIES.map((c) => {
            const n = PRODUCTS.filter((p) => p.category === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`chip ${category === c.id ? 'bg-sage-400 text-white shadow-soft' : 'bg-white text-dark/80 shadow-soft hover:bg-sage-50'}`}
              >
                {c.label}
                <span className="rounded-full bg-black/10 px-1.5 text-[11px]">{n}</span>
              </button>
            );
          })}
        </div>

        {/* Result count */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-dark/60">
            عرض <span className="font-bold text-dark">{filtered.length}</span> منتج
            {category !== 'all' && <> في تصنيف «{CATEGORIES.find((c) => c.id === category)?.label}»</>}
          </p>
          {(query || category !== 'all') && (
            <button
              onClick={() => { setQuery(''); setCategory('all'); }}
              className="text-sm font-bold text-sage-500 hover:text-sage-600"
            >
              إعادة ضبط
            </button>
          )}
        </div>
        <p className="sr-only">{activeCount} منتج متاح في هذا التصنيف</p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center gap-3 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-beige-100 text-dark/40">
              <Search className="h-9 w-9" />
            </span>
            <p className="font-display text-lg font-bold text-dark">لا توجد نتائج</p>
            <p className="text-sm text-dark/60">جرّب تعديل البحث أو التصنيف.</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAdd={handleAdd}
                onQuickView={onQuickView}
                added={!!addedIds[p.id]}
              />
            ))}
          </div>
        )}
      </section>

      {/* Price reassurance banner */}
      <section className="container-x mt-20">
        <div className="grid gap-4 rounded-3xl bg-sage-50 p-8 sm:grid-cols-3">
          {[
            { icon: CheckCircle2, t: 'جودة مضمونة', d: 'خامات مختارة تدوم لسنوات.' },
            { icon: CheckCircle2, t: 'أسعار شفافة', d: `تبدأ من ${formatSARWithCurrency(240)} فقط.` },
            { icon: CheckCircle2, t: 'توصيل وتركيب', d: 'خدمة احترافية لبيتك.' },
          ].map((x) => (
            <div key={x.t} className="flex items-start gap-3">
              <x.icon className="mt-0.5 h-6 w-6 shrink-0 text-sage-500" />
              <div>
                <p className="font-bold text-dark">{x.t}</p>
                <p className="text-sm text-dark/65">{x.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
