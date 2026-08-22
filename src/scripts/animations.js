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
  document.querySelectorAll('[data-reveal-text]').forEach((el) => {
    let split;
    try {
      split = new SplitText(el, { type: 'words', wordsClass: 'reveal-word' });
    } catch (e) {
      return;
    }

    // Wrap each word in a mask so it can slide up from underneath rather
    // than the whole line just popping into place.
    split.words.forEach((word) => {
      const mask = document.createElement('span');
      mask.className = 'reveal-word-mask';
      word.parentNode.insertBefore(mask, word);
      mask.appendChild(word);
    });

    gsap.fromTo(
      split.words,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.045,
        ease: 'power3.out',
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

function init() {
  if (prefersReducedMotion) {
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.style.opacity = 1;
      el.style.transform = 'none';
    });
    document.querySelectorAll('[data-scrub-text]').forEach((el) => {
      el.style.color = 'var(--ink)';
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

  // Safety net: force everything visible if something above throws.
  window.setTimeout(() => {
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      if (getComputedStyle(el).opacity === '0') {
        el.style.opacity = 1;
        el.style.transform = 'none';
      }
    });
    document.querySelectorAll('.reveal-word').forEach((el) => {
      if (getComputedStyle(el).opacity === '0') {
        el.style.opacity = 1;
        el.style.transform = 'none';
      }
    });
  }, 2500);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
