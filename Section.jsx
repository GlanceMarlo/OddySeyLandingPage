import { motion } from 'framer-motion';

/* =====================================================================
   Section — a full-height scroll panel whose content is anchored to one
   side (so the e-bike video stays visible in the open half) and animates
   IN as it scrolls into view (slides from its side + fades).

   On mobile every section collapses to a single bottom-anchored column.
   Reduced-motion users get an instant fade with no slide.
   ===================================================================== */

export default function Section({
  side = 'left',          // 'left' | 'right' | 'center'
  className = '',
  children,
  amount = 0.4,           // how much must be visible before it animates
  ...rest
}) {
  const justify =
    side === 'right' ? 'md:justify-end'
    : side === 'center' ? 'md:justify-center'
    : 'md:justify-start';

  // "Appear" entrance — instant pop-in (no fade, no slide), like PowerPoint.
  //   • FADE instead?  change `duration: 0` → e.g. 0.5
  //   • SLIDE-in?      add `x: 28` (or `y: 16`) to `hidden`
  const variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0 } },
  };

  return (
    <section
      className={`flex min-h-[100svh] items-end justify-center pb-24 md:items-center md:pb-0 ${justify} px-6 sm:px-10 lg:px-28 ${className}`}
      {...rest}
    >
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount }}
        className={
          side === 'center'
            ? 'w-full max-w-3xl text-center'
            : 'w-full max-w-lg'
        }
      >
        {children}
      </motion.div>
    </section>
  );
}

/* Convenience: a child that "appears" together with its parent (instant). */
export function Item({ className = '', children, ...rest }) {
  const variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0 } },
  };
  return (
    <motion.div variants={variants} className={className} {...rest}>
      {children}
    </motion.div>
  );
}
