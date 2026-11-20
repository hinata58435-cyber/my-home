import { useEffect, useState } from 'react';

export type Route = 'home' | 'shop' | 'about' | 'contact';

function parseHash(): Route {
  const h = window.location.hash.replace(/^#\/?/, '').split('/')[0];
  if (h === 'shop' || h === 'about' || h === 'contact') return h;
  return 'home';
}

export function navigate(route: Route) {
  window.location.hash = `/${route === 'home' ? '' : route}`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parseHash());
  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}
