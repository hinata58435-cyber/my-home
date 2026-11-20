import { useEffect, useState } from 'react';
import { ShoppingBag, Menu, X, Home as HomeIcon, Store, Info, Phone } from 'lucide-react';
import { navigate, type Route } from '@/hooks/useRoute';
import { STORE_INFO } from '@/data/store';

interface NavbarProps {
  current: Route;
  cartCount: number;
  onOpenCart: () => void;
}

const LINKS: { route: Route; label: string; icon: typeof HomeIcon }[] = [
  { route: 'home', label: 'الرئيسية', icon: HomeIcon },
  { route: 'shop', label: 'المتجر', icon: Store },
  { route: 'about', label: 'من نحن', icon: Info },
  { route: 'contact', label: 'تواصل معنا', icon: Phone },
];

export default function Navbar({ current, cartCount, onOpenCart }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const go = (route: Route) => {
    navigate(route);
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-ivory/90 backdrop-blur-md shadow-soft border-b border-beige-200/60'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-x flex h-20 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => go('home')}
            className="flex items-center gap-2.5 group"
            aria-label="My Home"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sage-400 text-white shadow-soft transition-transform group-hover:scale-105">
              <HomeIcon className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <span className="flex flex-col items-start leading-none">
              <span className="font-display text-xl font-bold text-dark">My Home</span>
              <span className="text-[11px] font-medium text-sage-500">أثاث منزلي فاخر</span>
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
            {LINKS.map(({ route, label, icon: Icon }) => {
              const active = current === route;
              return (
                <li key={route}>
                  <button
                    onClick={() => go(route)}
                    className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                      active
                        ? 'bg-sage-400 text-white shadow-soft'
                        : 'text-dark/80 hover:bg-sage-50 hover:text-sage-600'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Cart + mobile toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCart}
              className="relative grid h-12 w-12 place-items-center rounded-2xl bg-white text-dark shadow-soft transition-all hover:bg-sage-50 hover:text-sage-600 hover:scale-105"
              aria-label="سلة المشتريات"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -left-1.5 grid h-6 min-w-6 place-items-center rounded-full bg-wood px-1.5 text-xs font-bold text-white shadow animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-dark shadow-soft transition-all hover:bg-sage-50 lg:hidden"
              aria-label="القائمة"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-dark/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 right-0 flex w-[82%] max-w-sm flex-col bg-ivory shadow-lift animate-fade-in">
            <div className="flex items-center justify-between border-b border-beige-200 px-6 py-5">
              <span className="font-display text-lg font-bold text-dark">القائمة</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-xl bg-beige-100 text-dark hover:bg-sage-100"
                aria-label="إغلاق"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="flex flex-col gap-1 p-4">
              {LINKS.map(({ route, label, icon: Icon }) => {
                const active = current === route;
                return (
                  <li key={route}>
                    <button
                      onClick={() => go(route)}
                      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-base font-bold transition-all ${
                        active
                          ? 'bg-sage-400 text-white shadow-soft'
                          : 'text-dark hover:bg-sage-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-auto border-t border-beige-200 p-6 text-sm text-dark/70">
              <p className="font-bold text-dark">{STORE_INFO.city}</p>
              <p className="mt-1">{STORE_INFO.phone}</p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
