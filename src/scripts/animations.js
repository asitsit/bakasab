import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initReveals() {
  const groups = new Map();

  document.querySelectorAll('[data-reveal]').forEach((el) => {
    const groupKey = el.dataset.revealGroup || null;
    if (groupKey) {
      if (!groups.has(groupKey)) groups.set(groupKey, []);
      groups.get(groupKey).push(el);
    } else {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      });
    }
  });

  groups.forEach((els) => {
    gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: els[0].closest('[data-reveal-parent]') || els[0].parentElement,
        start: 'top 85%',
        once: true,
      },
    });
  });
}

function initRevealText() {
  // Header texts (page hero eyebrow/title/subtitle, home hero title) get a
  // small letter-by-letter reveal rather than the word-by-word one used
  // to slide up whole lines.
  document.querySelectorAll('[data-reveal-text]').forEach((el) => {
    let split;
    try {
      // Splitting words too (even though only chars animate) keeps the
      // natural space text between them intact — chars-only splitting
      // collapses inter-word whitespace.
      split = new SplitText(el, { type: 'words, chars', wordsClass: 'reveal-word', charsClass: 'reveal-char' });
    } catch (e) {
      return;
    }

    gsap.fromTo(
      split.chars,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.4,
        stagger: 0.018,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      }
    );
  });
}

function initMarquees() {
  document.querySelectorAll('[data-marquee]').forEach((track) => {
    const speed = Number(track.dataset.marqueeSpeed) || 40; // px per second
    const direction = track.dataset.marqueeDirection === 'reverse' ? 1 : -1;
    const row = track.querySelector('[data-marquee-row]');
    if (!row) return;

    const distance = row.scrollWidth / 2;
    const duration = distance / speed;

    gsap.to(track.querySelectorAll('[data-marquee-row]'), {
      xPercent: direction * 100,
      duration,
      ease: 'none',
      repeat: -1,
    });
  });
}

function initHorizontalPin() {
  const track = document.querySelector('[data-pin-track]');
  const wrapper = document.querySelector('[data-pin-content]');
  if (!track || !wrapper) return;

  ScrollTrigger.matchMedia({
    '(min-width: 901px)': () => {
      const getScrollDistance = () => wrapper.scrollWidth - window.innerWidth;

      const mainTween = gsap.to(wrapper, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: () => `+=${getScrollDistance() + window.innerHeight}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // Each card scales/brightens up as it crosses into focus, then eases
      // back down as it exits — the horizontal scrub isn't just a flat pan.
      wrapper.querySelectorAll('[data-pin-card]').forEach((card) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: card,
              containerAnimation: mainTween,
              start: 'left 88%',
              end: 'right 12%',
              scrub: true,
            },
          })
          .fromTo(
            card,
            { scale: 0.88, opacity: 0.55 },
            { scale: 1, opacity: 1, ease: 'power1.inOut', duration: 0.5 }
          )
          .to(card, { scale: 0.88, opacity: 0.55, ease: 'power1.inOut', duration: 0.5 });
      });
    },
  });
}

function initStackedCards() {
  const track = document.querySelector('[data-stack-track]');
  const cards = gsap.utils.toArray('[data-stack-card]');
  if (!track || !cards.length) return;

  ScrollTrigger.matchMedia({
    '(min-width: 901px)': () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: '+=' + cards.length * 700,
          scrub: 0.6,
          pin: true,
        },
      });

      // Each card gets a full "slot" of the timeline: the first half is the
      // crossfade with the previous card, the second half is a clean dwell
      // so the scrub isn't perpetually mid-blend between two cards.
      cards.forEach((card, i) => {
        if (i === 0) return;
        const slotStart = i - 1;
        tl.fromTo(
          card,
          { yPercent: 100, scale: 0.94, opacity: 0 },
          { yPercent: 0, scale: 1, opacity: 1, ease: 'power2.out', duration: 0.5 },
          slotStart
        );
        tl.to(
          cards[i - 1],
          { scale: 0.92, opacity: 0, ease: 'power2.out', duration: 0.5 },
          slotStart
        );
      });
    },
  });
}

function initScrubText() {
  const inkColor = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#1F1F1E';

  document.querySelectorAll('[data-scrub-text]').forEach((el) => {
    const fromColor = getComputedStyle(el).color;
    let split;
    try {
      split = new SplitText(el, { type: 'chars', charsClass: 'scrub-char' });
    } catch (e) {
      return;
    }

    gsap.fromTo(
      split.chars,
      { color: fromColor },
      {
        color: inkColor,
        stagger: 0.015,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'bottom 55%',
          scrub: true,
        },
      }
    );
  });
}

function initCounter() {
  document.querySelectorAll('[data-counter]').forEach((el) => {
    const from = Number(el.dataset.counterFrom) || 0;
    const to = Number(el.dataset.counterTo) || 0;
    const counter = { value: from };

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          value: to,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(counter.value).toLocaleString('fr-FR');
          },
        });
      },
    });
  });
}

function initVideoReveal() {
  const section = document.querySelector('[data-video-reveal]');
  if (!section) return;

  const frame = section.querySelector('[data-video-frame]');
  const flanks = section.querySelectorAll('[data-video-flank]');
  if (!frame) return;

  // Frame starts small and grows to fill the section as you scroll, while
  // "Play" / "Reel" (sitting behind the frame, at the width it will reach)
  // ride in from the sides and end up covered by the video once it catches
  // up to them — the text arrives "on" the video right as it fills out.
  gsap.fromTo(
    frame,
    { scale: 0.42 },
    {
      scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        end: 'top 15%',
        scrub: 0.4,
      },
    }
  );

  flanks.forEach((flank) => {
    const side = flank.dataset.videoFlank === 'left' ? -1 : 1;
    gsap.fromTo(
      flank,
      { opacity: 0, xPercent: side * 90 },
      {
        opacity: 1,
        xPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'top 15%',
          scrub: 0.4,
        },
      }
    );
  });
}

function init() {
  if (prefersReducedMotion) {
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.style.opacity = 1;
      el.style.transform = 'none';
    });
    document.querySelectorAll('[data-scrub-text]').forEach((el) => {
      el.style.color = 'var(--ink)';
    });
    document.querySelectorAll('[data-counter]').forEach((el) => {
      const to = Number(el.dataset.counterTo) || 0;
      el.textContent = to.toLocaleString('fr-FR');
    });
    return;
  }

  initReveals();
  initRevealText();
  initMarquees();
  initHorizontalPin();
  initStackedCards();
  initScrubText();
  initCounter();
  initVideoReveal();

  // Safety net: force everything visible if something above throws.
  window.setTimeout(() => {
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      if (getComputedStyle(el).opacity === '0') {
        el.style.opacity = 1;
        el.style.transform = 'none';
      }
    });
    document.querySelectorAll('.reveal-char').forEach((el) => {
      if (getComputedStyle(el).opacity === '0') {
        el.style.opacity = 1;
        el.style.transform = 'none';
      }
    });
    document.querySelectorAll('[data-counter]').forEach((el) => {
      const from = Number(el.dataset.counterFrom) || 0;
      const to = Number(el.dataset.counterTo) || 0;
      if (Number(String(el.textContent).replace(/\D/g, '')) === from && from !== to) {
        el.textContent = to.toLocaleString('fr-FR');
      }
    });
  }, 2500);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
