// Minimal, dependency-free classnames helper.
// Joins truthy class values (flattening arrays) so components can merge a base
// set of classes with a passed-in `className`. This covers shadcn's `cn(...)`
// usage here. If you later need conflict-aware merging, swap the body for
// `twMerge(clsx(inputs))` after installing clsx + tailwind-merge.
export function cn(...inputs) {
  return inputs.flat(Infinity).filter(Boolean).join(' ');
}
