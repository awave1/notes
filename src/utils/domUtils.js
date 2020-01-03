export function hasDarkMode() {
  const w = typeof window !== 'undefined' && window;
  return (
    w.matchMedia &&
    w.matchMedia('(prefers-color-scheme: dark)(prefers-color-scheme: dark)') !==
      undefined
  );
}
