import { useRef } from 'react';
import { cn } from '@/lib/utils';

// Size presets kept as whole class-sets (not merged) because this project's
// cn() is a naive joiner — overriding h-*/px-* via className wouldn't resolve
// predictably. Pass `size`; use `className` only for non-conflicting extras.
const SIZES = {
  sm: 'h-9 px-5 text-sm',
  md: 'h-10 px-6 text-sm',
  lg: 'h-12 px-7 text-base',
};

/**
 * HoverButton — a pill with a soft white spotlight that follows the cursor on
 * hover, a hairline border that brightens, and a gentle lift. Monochrome, tuned
 * to the Apple-minimal dark hero. Renders a native <button>, so it works for
 * both onClick handlers and type="submit" inside a form.
 *
 * @param {{ size?: 'sm'|'md'|'lg', type?: string, className?: string, children: React.ReactNode }} props
 */
export function HoverButton({
  children,
  className,
  type = 'button',
  size = 'md',
  ...props
}) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Feed cursor position to the spotlight gradient via CSS custom props.
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <button
      ref={ref}
      type={type}
      onMouseMove={handleMouseMove}
      className={cn(
        'group relative inline-flex items-center justify-center overflow-hidden rounded-full',
        'border border-white/25 bg-white/5 font-heading font-medium text-foreground',
        'cursor-pointer transition-all duration-300 ease-out',
        'hover:-translate-y-0.5 hover:border-white/60 hover:shadow-[0_10px_30px_-8px_rgba(255,255,255,0.35)]',
        'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        SIZES[size] ?? SIZES.md,
        className,
      )}
      {...props}
    >
      {/* Cursor-following spotlight — fades in on hover, clipped to the pill. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(110px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.22), transparent 60%)',
        }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
