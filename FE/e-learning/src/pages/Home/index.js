import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import Paragraph from './Paragraph';

const COVERS = [
  "https://i.scdn.co/image/ab67616d00001e020ecc8c4fd215d9eb83cbfdb3",
  "https://i.scdn.co/image/ab67616d00001e02d9194aa18fa4c9362b47464f",
  "https://i.scdn.co/image/ab67616d00001e02a7ea08ab3914c5fb2084a8ac",
  "https://i.scdn.co/image/ab67616d00001e0213ca80c3035333e5a6fcea59",
  "https://i.scdn.co/image/ab67616d00001e02df04e6071763615d44643725",
  "https://i.scdn.co/image/ab67616d00001e0239c7302c04f8d06f60e14403",
  "https://i.scdn.co/image/ab67616d00001e021c0bcf8b536295438d26c70d",
  "https://i.scdn.co/image/ab67616d00001e029bbd79106e510d13a9a5ec33",
  "https://i.scdn.co/image/ab67616d00001e021d97ca7376f835055f828139",
  "https://www.udiscovermusic.com/wp-content/uploads/2015/10/Kanye-West-Yeezus.jpg",
];

function Home() {
  const boxesRef = useRef(null);
  const dragProxyRef = useRef(null);

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initializeGSAP = async () => {
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/Draggable.min.js');

        window.gsap.registerPlugin(window.Draggable);

        setupCarousel();
      } catch (error) {
        console.error('Failed to load GSAP:', error);
      }
    };

    const setupCarousel = () => {
      const gsap = window.gsap;
      const Draggable = window.Draggable;

      gsap.set('.box', { yPercent: -50 });

      const STAGGER = 0.1;
      const DURATION = 1;
      const OFFSET = 0;
      const BOXES = gsap.utils.toArray('.box');

      const LOOP = gsap.timeline({ paused: true, repeat: -1, ease: 'none' });
      const SHIFTS = [...BOXES, ...BOXES, ...BOXES];

      SHIFTS.forEach((BOX, index) => {
        const BOX_TL = gsap
          .timeline()
          .set(BOX, { xPercent: 250, rotateY: -50, opacity: 0, scale: 0.5 })
          .to(BOX, { opacity: 1, scale: 1, duration: 0.1 }, 0)
          .to(BOX, { opacity: 0, scale: 0.5, duration: 0.1 }, 0.9)
          .fromTo(BOX, { xPercent: 250 }, { xPercent: -350, duration: 1, immediateRender: false, ease: 'power1.inOut' }, 0)
          .fromTo(BOX, { rotateY: -50 }, { rotateY: 50, immediateRender: false, duration: 1, ease: 'power4.inOut' }, 0)
          .to(BOX, { z: 100, scale: 1.25, duration: 0.1, repeat: 1, yoyo: true }, 0.4)
          .fromTo(BOX, { zIndex: 1 }, { zIndex: BOXES.length, repeat: 1, yoyo: true, ease: 'none', duration: 0.5, immediateRender: false }, 0);

        LOOP.add(BOX_TL, index * STAGGER);
      });

      const CYCLE_DURATION = STAGGER * BOXES.length;
      const START_TIME = CYCLE_DURATION + DURATION * 0.5 + OFFSET;

      const LOOP_HEAD = gsap.fromTo(LOOP, { totalTime: START_TIME }, { totalTime: `+=${CYCLE_DURATION}`, duration: 1, ease: 'none', repeat: -1, paused: true });

      const PLAYHEAD = { position: 0 };
      const POSITION_WRAP = gsap.utils.wrap(0, LOOP_HEAD.duration());

      const SCRUB = gsap.to(PLAYHEAD, {
        position: 0,
        onUpdate: () => {
          LOOP_HEAD.totalTime(POSITION_WRAP(PLAYHEAD.position));
        },
        paused: true,
        duration: 0.25,
        ease: 'power3',
      });

      const SNAP = gsap.utils.snap(1 / BOXES.length);

      // Function để điều khiển carousel bằng tay
      const scrollToPosition = (position) => {
        const SNAP_POS = SNAP(position);
        SCRUB.vars.position = SNAP_POS;
        SCRUB.invalidate().restart();
      };

      const NEXT = () => scrollToPosition(SCRUB.vars.position - 1 / BOXES.length);
      const PREV = () => scrollToPosition(SCRUB.vars.position + 1 / BOXES.length);

      // Keyboard controls
      document.addEventListener('keydown', (event) => {
        if (event.code === 'ArrowLeft' || event.code === 'KeyA') NEXT();
        if (event.code === 'ArrowRight' || event.code === 'KeyD') PREV();
      });

      // Click on album to select
      const boxesContainer = document.querySelector('.boxes');
      if (boxesContainer) {
        boxesContainer.addEventListener('click', (e) => {
          const BOX = e.target.closest('.box');
          if (BOX) {
            let TARGET = BOXES.indexOf(BOX);
            let CURRENT = gsap.utils.wrap(0, BOXES.length, Math.floor(BOXES.length * SCRUB.vars.position));
            let BUMP = TARGET - CURRENT;
            if (TARGET > CURRENT && TARGET - CURRENT > BOXES.length * 0.5) {
              BUMP = (BOXES.length - BUMP) * -1;
            }
            if (CURRENT > TARGET && CURRENT - TARGET > BOXES.length * 0.5) {
              BUMP = BOXES.length + BUMP;
            }
            scrollToPosition(SCRUB.vars.position + BUMP * (1 / BOXES.length));
          }
        });
      }

      // Button controls
      const nextButton = document.querySelector('.next');
      const prevButton = document.querySelector('.prev');

      if (nextButton) nextButton.addEventListener('click', NEXT);
      if (prevButton) prevButton.addEventListener('click', PREV);

      gsap.set('.box', { display: 'block' });
      gsap.set('button', { z: 200 });

      // Drag controls
      Draggable.create('.drag-proxy', {
        type: 'x',
        trigger: '.box',
        onPress() {
          this.startOffset = SCRUB.vars.position;
        },
        onDrag() {
          SCRUB.vars.position = this.startOffset + (this.startX - this.x) * 0.001;
          SCRUB.invalidate().restart();
        },
        onDragEnd() {
          scrollToPosition(SCRUB.vars.position);
        },
      });

      // Auto-play
      gsap.ticker.add(() => {
        SCRUB.vars.position += 0.0003; // tốc độ auto-play
        SCRUB.invalidate().restart();
      });
    };

    initializeGSAP();

    return () => {
      // Cleanup
    };
  }, []);

  return (
    <>
      <div className="home">
        <div className="boxes" ref={boxesRef}>
          {COVERS.map((cover, index) => (
            <div key={index} className="box" style={{ '--src': `url(${cover})` }}>
              {/* <span>{index + 1}</span> */}
              <Link to='/about' className="box-link">
              <img src={cover} alt={`Album ${index + 1}`} />
              </Link>
              {/* <img src={cover} alt={`Album ${index + 1}`} /> */}
              
            </div>
          ))}
        </div>

        {/* <div className="controls">
          <button className="spin-button next">
            <span>Previous album</span>
            <svg viewBox="0 0 448 512" width="100" title="Previous Album">
              <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"/>
            </svg>
          </button>
          <button className="spin-button prev">
            <span>Next album</span>
            <svg viewBox="0 0 448 512" width="100" title="Next Album">
              <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"/>
            </svg>
          </button>
        </div> */}

        <div className="drag-proxy" ref={dragProxyRef}></div>
        {/* <div className="paragraph">
          hello world

        </div> */}
        <Paragraph/>
      </div>
    </>
  );
}

export default Home;