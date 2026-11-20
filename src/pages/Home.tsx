import { ArrowLeft, ShoppingBag, Sparkles, BadgePercent, Truck, Star, Quote } from 'lucide-react';
import { navigate } from '@/hooks/useRoute';
import { PRODUCTS, GALLERY_IMAGES, HERO_IMAGE, TESTIMONIALS } from '@/data/products';
import { STORE_INFO, whatsappLink } from '@/data/store';
import { formatSARWithCurrency } from '@/utils/format';
import ProductCard from '@/components/ProductCard';
import StarRating from '@/components/StarRating';
import type { Product } from '@/data/products';

interface HomeProps {
  onAdd: (id: string) => void;
  onQuickView: (p: Product) => void;
}

const FEATURES = [
  { icon: Sparkles, title: 'جودة وأناقة', desc: 'قطع مختارة بعناية تجمع بين المتانة والتصميم الراقي.' },
  { icon: BadgePercent, title: 'أسعار تناسب الجميع', desc: 'أسعار تنافسية مع عروض دورية على مجموعات مختارة.' },
  { icon: Truck, title: 'توصيل موثوق', desc: 'خدمة توصيل وتركيب احترافية داخل مكة المكرمة وخارجها.' },
];

export default function Home({ onAdd, onQuickView }: HomeProps) {
  const featured = PRODUCTS.filter((p) => p.badge).slice(0, 8);

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-screen items-center flex">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="غرفة معيشة عصرية" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-dark/85 via-dark/55 to-dark/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
        </div>

        <div className="container-x relative z-10 pt-28 pb-16">
          <div className="max-w-2xl text-ivory">
            <span className="inline-flex animate-fade-up items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-sage-100 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              أثاث منزلي فاخر · مكة المكرمة
            </span>
            <h1 className="mt-6 animate-fade-up font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl" style={{ animationDelay: '0.1s' }}>
              اجعل منزلك يحكي حكايتك
            </h1>
            <p className="mt-5 max-w-xl animate-fade-up text-base leading-relaxed text-ivory/85 sm:text-lg" style={{ animationDelay: '0.2s' }}>
              في My Home نؤمن أن البيت يُصنع بالتفاصيل. نختار لك أثاثًا ومفروشات
              تجمع بين الراحة والجمال، لتصنع مساحة تعبّر عنك أنت.
            </p>
            <div className="mt-8 flex animate-fade-up flex-wrap gap-3" style={{ animationDelay: '0.3s' }}>
              <button onClick={() => navigate('shop')} className="btn-primary text-base">
                <ShoppingBag className="h-5 w-5" />
                تسوّق الآن
              </button>
              <button onClick={() => navigate('contact')} className="btn bg-white/15 text-ivory backdrop-blur hover:bg-white/25">
                تواصل معنا
              </button>
            </div>

            <div className="mt-12 flex animate-fade-up flex-wrap gap-x-10 gap-y-4" style={{ animationDelay: '0.4s' }}>
              {[
                { n: '+500', l: 'عميل سعيد' },
                { n: '+120', l: 'قطعة أثاث' },
                { n: '4.9', l: 'متوسط التقييم' },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-2xl font-bold text-sage-100">{s.n}</p>
                  <p className="text-sm text-ivory/70">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <a
          href="#features"
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-float text-ivory/60"
          aria-label="انزل للأسفل"
        >
          <div className="grid h-10 w-10 place-items-center rounded-full border border-white/30 backdrop-blur">
            <ArrowLeft className="h-5 w-5 rotate-90" />
          </div>
        </a>
      </section>

      {/* FEATURES */}
      <section id="features" className="container-x -mt-20 relative z-20">
        <div className="grid gap-5 sm:grid-cols-3">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="card animate-fade-up p-7 hover:shadow-card hover:-translate-y-1"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sage-50 text-sage-500">
                <f.icon className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-dark">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-dark/65">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="container-x mt-24">
        <div className="text-center">
          <span className="eyebrow justify-center">معرض الإلهام</span>
          <h2 className="section-title mt-3">تصاميم تُلهم بيتك</h2>
          <p className="mx-auto mt-3 max-w-2xl text-dark/60">تصفّح تشكيلة من أركان المنزل التي صمّمناها بعناية — من غرف المعيشة إلى غرف النوم.</p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {GALLERY_IMAGES.map((g, i) => (
            <button
              key={i}
              onClick={() => navigate('shop')}
              className={`group relative overflow-hidden rounded-3xl shadow-soft ${i === 0 ? 'col-span-2 row-span-2 md:col-span-2' : ''}`}
            >
              <img
                src={g.src}
                alt={g.title}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${i === 0 ? 'h-full min-h-[280px]' : 'h-48 md:h-56'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
              <div className="absolute bottom-4 right-4 text-right text-ivory">
                <p className="font-display text-lg font-bold">{g.title}</p>
                <p className="text-sm text-sage-100">{g.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container-x mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">منتجات مختارة</span>
            <h2 className="section-title mt-3">قطع تعشقها من أول نظرة</h2>
          </div>
          <button onClick={() => navigate('shop')} className="btn-outline">
            عرض الكل
            <ArrowLeft className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} onQuickView={onQuickView} />
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-x mt-24">
        <div className="text-center">
          <span className="eyebrow justify-center">آراء عملائنا</span>
          <h2 className="section-title mt-3">قصص سعادة من بيوتكم</h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="card relative p-7 hover:shadow-card">
              <Quote className="absolute left-6 top-6 h-10 w-10 text-sage-100" />
              <StarRating value={t.rating} size={18} />
              <p className="mt-4 text-sm leading-relaxed text-dark/75">{t.text}</p>
              <div className="mt-6 flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover" loading="lazy" />
                <div>
                  <p className="font-bold text-dark">{t.name}</p>
                  <p className="text-xs text-dark/55">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x mt-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-dark px-8 py-16 text-center text-ivory shadow-card sm:px-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sage-400/20 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-wood/20 blur-3xl" />
          <div className="relative">
            <Star className="mx-auto h-8 w-8 text-sage-300" fill="currentColor" />
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">بيتك يستحق لمسة مميزة</h2>
            <p className="mx-auto mt-4 max-w-xl text-ivory/75">اكتشف مجموعتنا الكاملة من الأثاث والمفروشات وابدأ رحلة تأثيث منزلك اليوم.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button onClick={() => navigate('shop')} className="btn-primary text-base">
                <ShoppingBag className="h-5 w-5" />
                ابدأ التسوق
              </button>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn bg-white/15 text-ivory backdrop-blur hover:bg-white/25">
                استشرنا مجانًا
              </a>
            </div>
            <p className="mt-6 text-sm text-ivory/50">{STORE_INFO.city} · {STORE_INFO.hours}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
