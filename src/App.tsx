import { useCallback, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import CartDrawer from '@/components/CartDrawer';
import QuickView from '@/components/QuickView';
import Toast from '@/components/Toast';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import { useRoute } from '@/hooks/useRoute';
import { useCart } from '@/hooks/useCart';
import type { Product } from '@/data/products';

export default function App() {
  const route = useRoute();
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const handleAdd = useCallback(
    (id: string, qty = 1) => {
      cart.addToCart(id, qty);
      const p = cart.detailedItems.find((i) => i.id === id)?.product;
      setToast(`تمت إضافة «${p?.name ?? 'المنتج'}» إلى السلة`);
    },
    [cart],
  );

  const handleQuickViewAdd = useCallback(
    (id: string, qty: number) => {
      cart.addToCart(id, qty);
      const product = cart.detailedItems.find((i) => i.id === id)?.product;
      setToast(`تمت إضافة «${product?.name ?? 'المنتج'}» إلى السلة`);
      setQuickView(null);
    },
    [cart],
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar current={route} cartCount={cart.count} onOpenCart={() => setCartOpen(true)} />

      <main className="flex-1">
        {route === 'home' && <Home onAdd={handleAdd} onQuickView={setQuickView} />}
        {route === 'shop' && <Shop onAdd={handleAdd} onQuickView={setQuickView} cartCount={cart.count} />}
        {route === 'about' && <About />}
        {route === 'contact' && <Contact />}
      </main>

      <Footer />

      <WhatsAppButton />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart.detailedItems}
        subtotal={cart.subtotal}
        count={cart.count}
        onIncrement={cart.increment}
        onDecrement={cart.decrement}
        onRemove={cart.removeFromCart}
        onClear={cart.clearCart}
      />

      <QuickView product={quickView} onClose={() => setQuickView(null)} onAdd={handleQuickViewAdd} />

      <Toast message={toast} onDone={() => setToast(null)} />
    </div>
  );
}
