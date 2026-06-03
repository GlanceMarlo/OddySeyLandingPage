import { useCallback, useRef, useState } from 'react';
import {
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@heroui/react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import ScrollFrameStage from './ScrollFrameStage.jsx';
import Section, { Item } from './Section.jsx';
import OmegaFooter from './components/OmegaFooter.jsx';
import { Component as TypewriterTestimonials } from '@/components/ui/typewriter-testimonial';
import { HoverButton } from '@/components/ui/hover-button';

const VIDEO_SRC = '/Create_a_transition.mp4';

const NAV_LINKS = [
  { label: 'Specs', href: '#specs' },
];

// Hover-driven testimonials for the typewriter component. `audio` points at a
// file in /public/audio/ — drop audio_1.mp3 … audio_6.mp3 there to enable the
// voice clips; until then each hover gracefully falls back to typewriter-only.
const TESTIMONIALS = [
  {
    image:
      'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    audio: 'audio_1.mp3',
    text: 'The first e-bike that feels like it disappears beneath you. Pure flow.',
    name: 'Maya R.',
    jobtitle: 'Daily commuter, Lisbon',
  },
  {
    image:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    audio: 'audio_2.mp3',
    text: 'Climbs hills I used to avoid and still looks gorgeous parked outside.',
    name: 'Tom V.',
    jobtitle: 'Weekend rider, Denver',
  },
  {
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    audio: 'audio_3.mp3',
    text: 'Range is no joke — a full week of commutes on one charge.',
    name: 'Aisha K.',
    jobtitle: 'Designer, Berlin',
  },
  {
    image:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    audio: 'audio_4.mp3',
    text: "Forty kilometres a day in the rain and it hasn't skipped a beat. Built like it means it.",
    name: 'Marcus L.',
    jobtitle: 'Bike courier, Amsterdam',
  },
  {
    image:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    audio: 'audio_5.mp3',
    text: 'Silent motor, all-day battery — I chase light at dawn and never think about charging.',
    name: 'Priya N.',
    jobtitle: 'Photographer, Mumbai',
  },
  {
    image:
      'https://images.unsplash.com/photo-1507003211169-0a6dd7228f2d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    audio: 'audio_6.mp3',
    text: "It's the rare object that's beautiful and invisible at once. It just gets out of the way.",
    name: 'Jonas B.',
    jobtitle: 'Architect, Copenhagen',
  },
];

const Wordmark = ({ className = '' }) => (
  <span className={`font-heading font-medium tracking-[0.02em] text-foreground ${className}`}>
    ODDYSEY
  </span>
);

export default function App() {
  const [progress, setProgress] = useState(0);
  const [decode, setDecode] = useState(0);
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();

  // Subtle headline parallax — as the hero scrolls away, the copy drifts down
  // slightly slower than the page (adding depth) and eases out. Scoped to the
  // hero section; neutralized under prefers-reduced-motion.
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const headlineY = useTransform(heroScroll, [0, 1], [0, 80]);
  // Fade fully within the first third of the hero scroll so the headline is
  // gone BEFORE it drifts up into the fixed transparent navbar — otherwise it
  // bleeds through and collides with the wordmark / nav links.
  const headlineOpacity = useTransform(heroScroll, [0, 0.35], [1, 0]);

  const handleProgress = useCallback((p) => setProgress(p), []);
  const handleDecode = useCallback((d) => setDecode(d), []);
  const handleReady = useCallback(() => setReady(true), []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const goTo = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Entrance animation — "Appear" (instant pop-in, like PowerPoint's Appear).
  //   • Want a FADE instead?  change `duration: 0` → e.g. 0.5
  //   • Want a SLIDE-in?      add `y: 24` (or `x: 24`) to `hidden`
  const heroParent = {
    hidden: {},
    show: { transition: { staggerChildren: 0 } },
  };
  const heroChild = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0 } },
  };

  // Soft indigo light that drifts as the page scrolls — gives the sections
  // motion without a time loop. A static soft radial moved by GPU `transform`
  // (cheap, no per-frame repaint), driven by scroll `progress` (0→1).
  const glowShift = reduce
    ? 'none'
    : `translate3d(${progress * 36}%, ${progress * 120}%, 0)`;

  return (
    <>
      {/* Clean gradient backdrop */}
      <div className="bg-gradient" aria-hidden="true" />

      {/* Scroll-driven WebGL frames */}
      <ScrollFrameStage
        src={VIDEO_SRC}
        onProgress={handleProgress}
        onDecodeProgress={handleDecode}
        onReady={handleReady}
      />
      <div className="stage-overlay" aria-hidden="true" />
      <div className="stage-aurora" aria-hidden="true">
        <div className="stage-aurora__glow" style={{ transform: glowShift }} />
      </div>

      {/* Scroll progress (solid, no gradient) */}
      <div
        className="fixed left-0 top-0 z-50 h-[3px] bg-white"
        style={{ width: `${progress * 100}%` }}
        aria-hidden="true"
      />

      {/* Loader */}
      {!ready && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-background">
          <Wordmark className="text-xl" />
          <div className="h-[3px] w-[min(220px,60vw)] overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-white transition-[width] duration-200 ease-linear"
              style={{ width: `${decode * 100}%` }}
            />
          </div>
          <p className="text-xs uppercase tracking-[0.18em] text-default-300">
            Decoding frames…{' '}
            <span className="tabular-nums">{Math.round(decode * 100)}%</span>
          </p>
        </div>
      )}

      {/* Minimal nav */}
      <Navbar
        isMenuOpen={menuOpen}
        onMenuOpenChange={setMenuOpen}
        maxWidth="full"
        className="fixed top-0 z-40 bg-transparent"
        classNames={{ wrapper: 'px-6 sm:px-10' }}
      >
        <NavbarBrand>
          <button onClick={scrollTop} className="cursor-pointer">
            <Wordmark className="text-lg" />
          </button>
        </NavbarBrand>

        <NavbarContent className="hidden gap-8 md:flex" justify="center">
          {NAV_LINKS.map((l) => (
            <NavbarItem key={l.href}>
              <button
                onClick={() => goTo(l.href)}
                className="cursor-pointer text-sm text-default-300 transition-colors hover:text-foreground"
              >
                {l.label}
              </button>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden md:flex">
            <HoverButton size="sm" onClick={() => goTo('#reserve')}>
              Reserve
            </HoverButton>
          </NavbarItem>
          <NavbarMenuToggle className="md:hidden" />
        </NavbarContent>

        <NavbarMenu className="bg-background/95 backdrop-blur-xl">
          {NAV_LINKS.map((l) => (
            <NavbarMenuItem key={l.href}>
              <button
                onClick={() => goTo(l.href)}
                className="w-full py-2 text-left text-lg text-foreground"
              >
                {l.label}
              </button>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
            <HoverButton size="md" className="mt-2" onClick={() => goTo('#reserve')}>
              Reserve
            </HoverButton>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>

      {/* ---------------- Content layer ---------------- */}
      <div className="relative z-10">

        {/* 1 · Hero — headline only; the bike is the hero.
            Vertical position knob: items-start (top) / items-center (middle) /
            items-end (bottom). Fine-tune with pt-* (from top) or pb-* (from bottom). */}
        <section ref={heroRef} className="flex min-h-[100svh] items-center justify-start px-6 pt-24 sm:px-10 lg:px-28">
          <motion.div
            variants={heroParent}
            initial="hidden"
            animate="show"
            style={reduce ? undefined : { y: headlineY, opacity: headlineOpacity }}
            className="w-full max-w-xs sm:max-w-sm"
          >
            <motion.h1
              variants={heroChild}
              className="font-heading text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl"
            >
              The journey,
              <br />
              electrified.
            </motion.h1>
          </motion.div>
        </section>

        {/* 2 · Spec highlights — heading only. POSITION KNOBS (edit here):
            • Horizontal side ...... side="left" | "right" | "center" on <Section>
            • Pin to an edge ....... ml-auto (right) | mr-auto (left) | mx-auto (center)
            • Width ................ max-w-md  (smaller = narrower)
            • Vertical nudge ....... add -translate-y-16 (up) / translate-y-16 (down)
            • Whole-page anchor .... items-start|center|end in Section.jsx */}
        <Section id="specs" side="right">
          <div className="ml-64 w-full max-w-md">
            <Item>
              <h2 className="font-heading text-4xl font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
                Every detail, measured.
              </h2>
            </Item>
          </div>
        </Section>

        

        {/* 4 · Reviews section removed — can be re-added near the Reserve CTA later. */}

        {/* 5 · Final CTA + footer — SOLID zone; the e-bike is no longer visible here */}
        <div className="relative z-10">
          {/* fade the bike out into the solid zone */}
          <div
            className="pointer-events-none h-40 w-full bg-gradient-to-b from-transparent to-[#0B0F1F]"
            aria-hidden="true"
          />

          <div className="overflow-hidden bg-[#0B0F1F]">
            {/* CTA */}
            <section id="reserve" className="px-6 py-24 text-center sm:px-10 sm:py-32 lg:px-28">
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: reduce ? 0.3 : 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-3xl"
              >
                <h2 className="font-heading text-4xl font-semibold tracking-[-0.025em] text-foreground sm:text-6xl">
                  Reserve your Oddysey.
                </h2>
                <p className="mx-auto mt-4 max-w-[42ch] text-lg text-default-300">
                  Early access, launch pricing, and a test ride near you. No deposit.
                </p>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="mx-auto mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row"
                >
                  <Input
                    type="email"
                    radius="full"
                    size="lg"
                    variant="bordered"
                    placeholder="you@example.com"
                    aria-label="Email address"
                    classNames={{
                      inputWrapper:
                        'border-white/20 bg-white/5 data-[hover=true]:border-white/40 group-data-[focus=true]:border-white',
                      input: 'text-foreground',
                    }}
                  />
                  <HoverButton type="submit" size="lg" className="w-full sm:w-auto">
                    Reserve
                  </HoverButton>
                </form>

                {/* Testimonials — social proof under the CTA */}
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-default-300">
                  <span className="font-heading font-semibold tabular-nums text-foreground">
                    4.9
                  </span>
                  <span className="tabular-nums">/ 5 · 2,800+ riders</span>
                </div>

                {/* Hover a rider to hear them out — an optional voice clip plays
                    and their quote types itself into the bubble.
                    See src/components/ui/typewriter-testimonial.jsx */}
                <div className="mt-20">
                  <TypewriterTestimonials testimonials={TESTIMONIALS} />
                </div>
              </motion.div>
            </section>


            <OmegaFooter />
          </div>
        </div>
      </div>
    </>
  );
}
