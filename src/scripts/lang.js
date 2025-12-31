const KEY = 'neurovivir:lang';
const EVT = 'neurovivir:lang';
let current = 'es';
try {
  const saved = window.localStorage.getItem(KEY);
  if (saved === 'en' || saved === 'es') current = saved;
} catch {}
function init() {}
function get() { return current }
function set(next) {
  if (next !== 'es' && next !== 'en') return;
  if (next === current) return;
  current = next;
  try {
    window.localStorage.setItem(KEY, current);
    window.dispatchEvent(new CustomEvent(EVT, { detail: current }));
  } catch {}
}
function onChange(fn) {
  const handler = (e) => { if (e && e.detail) fn(e.detail) };
  window.addEventListener(EVT, handler);
  return () => window.removeEventListener(EVT, handler);
}
window.NV_LANG = { init, get, set, onChange };
