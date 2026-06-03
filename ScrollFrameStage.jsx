import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* =====================================================================
   ScrollFrameStage
   ---------------------------------------------------------------------
   Decodes the source video into a fixed set of frames ONCE, caches them
   as ImageBitmaps, then maps scroll progress (0→1) to a frame index.
   Scrolling down advances frames; scrolling up rewinds them. Because we
   never seek during scroll, playback is smooth (not flaky).

   Renders the active frame on a full-screen plane via a Three.js
   orthographic camera, "cover"-fitted to any viewport.
   ===================================================================== */

const FRAME_COUNT = 200;  // frames extracted across the whole clip
const MAX_WIDTH = 1280;   // cap frame resolution to keep memory sane
const LERP = 0.1;         // playback smoothing — lower = silkier

export default function ScrollFrameStage({ src, onProgress, onReady, onDecodeProgress }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let raf = 0;
    let disposed = false;

    // --- video decode source ---------------------------------------
    const video = document.createElement('video');
    video.src = src;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.crossOrigin = 'anonymous';
    video.setAttribute('webkit-playsinline', '');

    // --- three.js scene --------------------------------------------
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const texture = new THREE.Texture();
    texture.flipY = false; // flipY is ignored for ImageBitmap; we pre-flip the bitmap
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.MeshBasicMaterial({ map: texture })
    );
    scene.add(mesh);

    // --- frame extraction ------------------------------------------
    const frames = [];
    let frameAspect = 16 / 9;
    let ready = false;

    const seekTo = (t) =>
      new Promise((resolve) => {
        const onSeeked = () => {
          video.removeEventListener('seeked', onSeeked);
          resolve();
        };
        video.addEventListener('seeked', onSeeked);
        video.currentTime = t;
      });

    async function extractFrames() {
      const duration = video.duration;
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      frameAspect = vw / vh;

      const scale = Math.min(1, MAX_WIDTH / vw);
      const cw = Math.round(vw * scale);
      const ch = Math.round(vh * scale);

      const off = document.createElement('canvas');
      off.width = cw;
      off.height = ch;
      const ctx = off.getContext('2d', { alpha: false });

      for (let i = 0; i < FRAME_COUNT; i++) {
        if (disposed) return;
        const t = Math.min((i / (FRAME_COUNT - 1)) * duration, duration - 0.001);
        await seekTo(t);
        ctx.drawImage(video, 0, 0, cw, ch);
        // Pre-flip: WebGL samples bottom-left first, so without this the
        // frame renders upside down.
        frames.push(await createImageBitmap(off, { imageOrientation: 'flipY' }));
        onDecodeProgress?.((i + 1) / FRAME_COUNT);
      }
    }

    // --- cover fit (like CSS object-fit: cover) --------------------
    function fitCover() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      const screenAspect = w / h;

      if (screenAspect > frameAspect) {
        texture.repeat.set(1, frameAspect / screenAspect);
        texture.offset.set(0, (1 - texture.repeat.y) / 2);
      } else {
        texture.repeat.set(screenAspect / frameAspect, 1);
        texture.offset.set((1 - texture.repeat.x) / 2, 0);
      }
    }

    // --- scroll → frame index --------------------------------------
    let targetIndex = 0;
    let currentIndex = 0;
    let shownIndex = -1;

    function scrollProgress() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return 0;
      return Math.min(Math.max(window.scrollY / max, 0), 1);
    }

    function handleScroll() {
      const p = scrollProgress();
      targetIndex = p * (FRAME_COUNT - 1);
      onProgress?.(p);
    }

    // --- render loop ------------------------------------------------
    function tick() {
      raf = requestAnimationFrame(tick);
      if (!ready) return;

      currentIndex +=
        (targetIndex - currentIndex) * (prefersReducedMotion ? 1 : LERP);

      const idx = Math.round(currentIndex);
      if (idx !== shownIndex && frames[idx]) {
        texture.image = frames[idx];
        texture.needsUpdate = true;
        shownIndex = idx;
        renderer.render(scene, camera);
      }
    }

    // --- boot -------------------------------------------------------
    function reveal() {
      ready = true;
      fitCover();
      texture.image = frames[0];
      texture.needsUpdate = true;
      shownIndex = 0;
      renderer.render(scene, camera);
      handleScroll();
      canvas.classList.add('is-ready');
      onReady?.();
    }

    const onMeta = async () => {
      try {
        await extractFrames();
        if (!disposed) reveal();
      } catch (err) {
        console.error('Frame extraction failed:', err);
        onReady?.(err);
      }
    };

    const onResize = () => {
      fitCover();
      shownIndex = -1; // force re-upload of the current frame at the new size
    };

    const onErr = () => {
      if (!disposed) onReady?.(new Error('video load error'));
    };
    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('error', onErr);
    video.load();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    tick();

    // --- cleanup ----------------------------------------------------
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('error', onErr);
      frames.forEach((f) => f.close?.());
      texture.dispose();
      mesh.geometry.dispose();
      mesh.material.dispose();
      renderer.dispose();
      video.removeAttribute('src');
      video.load();
    };
  }, [src, onProgress, onReady, onDecodeProgress]);

  return <canvas id="stage" ref={canvasRef} aria-hidden="true" />;
}
