export type Lang = 'es' | 'en';

type Listener = (lang: Lang) => void;

let current: Lang = 'es';
const listeners = new Set<Listener>();
const EVENT_NAME = 'neurovivir:lang';

function readInitial(): Lang {
  try {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('neurovivir:lang');
      if (saved === 'en' || saved === 'es') return saved;
    }
  } catch {}
  return 'es';
}

export function initLang() {
  current = readInitial();
}

export function getLang(): Lang {
  return current;
}

export function setLang(next: Lang) {
  if (next === current) return;
  current = next;
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('neurovivir:lang', current);
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: current }));
    }
  } catch {}
  for (const fn of listeners) fn(current);
}

export function subscribe(fn: Listener) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function onLangChange(fn: Listener) {
  if (typeof window !== 'undefined') {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<Lang>).detail;
      if (detail) fn(detail);
    };
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }
  return () => {};
}

export function useLanguage() {
  return {
    get: getLang,
    set: setLang,
    subscribe,
    onChange: onLangChange
  };
}
