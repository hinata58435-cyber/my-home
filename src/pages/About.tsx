import { Sparkles, Eye, Heart, Gem, Award, ShieldCheck, Home as HomeIcon, ArrowLeft } from 'lucide-react';
import { navigate } from '@/hooks/useRoute';
import { ABOUT_IMAGE } from '@/data/products';
import { STORE_INFO } from '@/data/store';

const VALUES = [
  { icon: Gem, title: 'الجودة', desc: 'نختار قطعًا من خامات تدوم، لأن بيتك يستحق الأفضل.' },
  { icon: ShieldCheck, title: 'الثقة', desc: 'شفافية في الأسعار والوصف، ووضوح في كل خطوة.' },
  { icon: Sparkles, title: 'الأناقة', desc: 'تصاميم عصرية تعكس ذوقك وتليق ببيتك.' },
  { icon: Heart, title: 'رضا العملاء', desc: 'سعادتك هدفنا، وخدمتنا تستمر بعد الشراء.' },
];

const REASONS = [
  { icon: Award, title: 'خبرة في الاختيار', desc: 'ننتقي كل قطعة بعناية لتجمع بين الجمال والعملية.' },
  { icon: Eye, title: 'ذوق يلهم', desc: 'معرضنا مصمم ليمنحك أفكارًا لكل ركن في بيتك.' },
  { icon: ShieldCheck, title: 'ضمان الجودة', desc: 'كل منتج يخضع لفحص الجودة قبل أن يصل إليك.' },
  { icon: Heart, title: 'خدمة بشغف', desc: 'فريقنا يحب ما يفعل، ويظهر ذلك في كل تفصيلة.' },
];

export default function About() {
  return (
    <div className="pt-20">
      {/* Intro */}
      <section className="bg-gradient-to-b from-beige-100 to-ivory py-16">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="eyebrow"><HomeIcon className="h-4 w-4" /> من نحن</span>
            <h1 className="mt-3 font-display text-4xl font-bold text-dark sm:text-5xl">قصة My Home</h1>
            <p className="mt-5 text-base leading-relaxed text-dark/75">
              بدأت My Home في قلب مكة المكرمة بحلم بسيط: أن نجعل تأثيث البيت تجربة
              مريحة وممتعة. نؤمن أن الأثاث ليس مجرد قطع خشبية، بل تفاصيل تروي حكاية
              من يعيش فيها.
            </p>
            <p className="mt-4 text-base leading-relaxed text-dark/75">
              نختار لك مجموعات تجمع بين الراحة والأناقة، بخامات تدوم وأسعار تعامل
              بها بشفافية. هدفنا أن تخرج من تجربتك معنا ببيت تشعر أنه أنت.
            </p>
            <button onClick={() => navigate('shop')} className="btn-primary mt-8">
              تصفّح منتجاتنا
              <ArrowLeft className="h-4 w-4" />
            </button>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2.5rem] shadow-card">
              <img src={ABOUT_IMAGE} alt="أثاث My Home" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden rounded-3xl bg-white p-5 shadow-lift sm:block">
              <p className="font-display text-2xl font-bold text-sage-600">+500</p>
              <p className="text-sm text-dark/65">عميل سعيد في مكة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="container-x mt-20">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="card p-8 hover:shadow-card">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sage-50 text-sage-500">
              <Eye className="h-7 w-7" />
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold text-dark">رؤيتنا</h2>
            <p className="mt-3 leading-relaxed text-dark/70">
              أن نكون الوجهة الأولى لتأثيث البيت في مكة المكرمة، بتوفير أثاث يجمع
              بين الراحة والجمال، ويُلهم عملاءنا لخلق مساحات تعبّر عنهم.
            </p>
          </div>
          <div className="card p-8 hover:shadow-card">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-wood/10 text-wood-dark">
              <Heart className="h-7 w-7" />
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold text-dark">رسالتنا</h2>
            <p className="mt-3 leading-relaxed text-dark/70">
              مساعدة عملائنا على إنشاء منازل مريحة وأنيقة، عبر منتجات مختارة بعناية
              وخدمة صادقة تستمر بعد الشراء، لأن بيتك يستحق لمسة مميزة.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-x mt-20">
        <div className="text-center">
          <span className="eyebrow justify-center">قيمنا</span>
          <h2 className="section-title mt-3">ما نؤمن به</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className="card animate-fade-up p-7 text-center hover:shadow-card hover:-translate-y-1"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-sage-50 text-sage-500">
                <v.icon className="h-7 w-7" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-dark">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-dark/65">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="container-x mt-20">
        <div className="rounded-[2.5rem] bg-dark px-8 py-14 text-ivory sm:px-14">
          <div className="text-center">
            <span className="eyebrow justify-center text-sage-200">لماذا My Home</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">أسباب تجعلنا خيارك الأول</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map((r) => (
              <div key={r.title} className="rounded-3xl bg-white/5 p-6 transition-colors hover:bg-white/10">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sage-400 text-white">
                  <r.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ivory">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/70">{r.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button onClick={() => navigate('contact')} className="btn bg-sage-400 text-white hover:bg-sage-500">
              تواصل معنا اليوم
            </button>
            <p className="mt-4 text-sm text-ivory/50">{STORE_INFO.address}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
