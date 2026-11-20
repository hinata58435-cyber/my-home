import { Home as HomeIcon, Store, Info, Phone, MapPin, Mail, Phone as PhoneIcon, Instagram, Twitter, Music2 } from 'lucide-react';
import { navigate, type Route } from '@/hooks/useRoute';
import { STORE_INFO, whatsappLink } from '@/data/store';

const LINKS: { route: Route; label: string; icon: typeof HomeIcon }[] = [
  { route: 'home', label: 'الرئيسية', icon: HomeIcon },
  { route: 'shop', label: 'المتجر', icon: Store },
  { route: 'about', label: 'من نحن', icon: Info },
  { route: 'contact', label: 'تواصل معنا', icon: Phone },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-dark text-ivory">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sage-400 text-white">
                <HomeIcon className="h-5 w-5" strokeWidth={2.4} />
              </span>
              <div className="leading-none">
                <p className="font-display text-xl font-bold">My Home</p>
                <p className="text-[11px] text-sage-200">أثاث منزلي فاخر</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-ivory/70">
              نجعل منزلك يحكي حكايتك. أثاث ومفروشات تجمع بين الجودة والأناقة والراحة،
              من قلب مكة المكرمة إلى بيتك.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-base font-bold text-sage-200">روابط سريعة</h4>
            <ul className="mt-4 space-y-2.5">
              {LINKS.map(({ route, label, icon: Icon }) => (
                <li key={route}>
                  <button
                    onClick={() => navigate(route)}
                    className="flex items-center gap-2 text-sm text-ivory/75 transition-colors hover:text-sage-200"
                  >
                    <Icon className="h-4 w-4 text-sage-300" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-base font-bold text-sage-200">معلومات التواصل</h4>
            <ul className="mt-4 space-y-3 text-sm text-ivory/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sage-300" />
                <span>{STORE_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneIcon className="h-4 w-4 shrink-0 text-sage-300" />
                <span dir="ltr">{STORE_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-sage-300" />
                <span dir="ltr">{STORE_INFO.email}</span>
              </li>
            </ul>
          </div>

          {/* Social + whatsapp */}
          <div>
            <h4 className="font-display text-base font-bold text-sage-200">تابعنا</h4>
            <div className="mt-4 flex gap-2.5">
              {[
                { href: STORE_INFO.social.instagram, icon: Instagram, label: 'انستغرام' },
                { href: STORE_INFO.social.twitter, icon: Twitter, label: 'تويتر' },
                { href: STORE_INFO.social.tiktok, icon: Music2, label: 'تيك توك' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-ivory transition-all hover:bg-sage-400 hover:scale-105"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-sage-400 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-sage-500"
            >
              <Phone className="h-4 w-4" />
              تواصل عبر واتساب
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-ivory/60 sm:flex-row">
          <p>© {new Date().getFullYear()} My Home — جميع الحقوق محفوظة.</p>
          <p>صُنع بشغف في مكة المكرمة</p>
        </div>
      </div>
    </footer>
  );
}
