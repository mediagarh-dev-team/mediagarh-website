'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { ArrowUpRight, Star, TrendingUp, Users } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];
const ROTATE_STEP = 85; // har slide change pe circle itne degree ghumega (80-90)
const INITIAL_SLIDE = 1; // dusra card active (white) dikhe

// Avatar stack
const AVATAR_SIZE = 32;
const AVATAR_STEP = 22;
const AVATARS = ['images/home/elipsis-img-1.webp', 'images/home/elipsis-img-2.webp', 'images/home/elipsis-img-3.webp'];

// Slider data: apna real data yahan bharo
const SLIDES = [
  {
    id: 1,
    img: 'images/home/hero-slider-img-1.webp',
    brand: 'Fuxam',
    roas: '73%',
    admissions: '120+',
    accent: '#6B4FD8',
  },
  {
    id: 2,
    img: 'images/home/hero-slider-img-2.webp',
    brand: 'Fuxam',
    roas: '85%',
    admissions: '150+',
    accent: '#2563EB',
  },
  {
    id: 3,
    img: 'images/home/hero-slider-img-3.webp',
    brand: 'Fuxam',
    roas: '68%',
    admissions: '90+',
    accent: '#C9304A',
  },
  {
    id: 4,
    img: 'images/home/hero-slider-img-4.webp',
    brand: 'Fuxam',
    roas: '92%',
    admissions: '180+',
    accent: '#0F9D74',
  },
  {
    id: 5,
    img: 'images/home/hero-slider-img-5.webp',
    brand: 'Fuxam',
    roas: '77%',
    admissions: '110+',
    accent: '#D9822B',
  },
  {
    id: 6,
    img: 'images/home/hero-slider-img-6.webp',
    brand: 'Fuxam',
    roas: '81%',
    admissions: '140+',
    accent: '#6B4FD8',
  },
  {
    id: 7,
    img: 'images/home/hero-slider-img-7.webp',
    brand: 'Fuxam',
    roas: '64%',
    admissions: '85+',
    accent: '#C9304A',
  },
  {
    id: 8,
    img: 'images/home/hero-slider-img-8.webp',
    brand: 'Fuxam',
    roas: '88%',
    admissions: '160+',
    accent: '#2563EB',
  },
];

// Framer motion variants
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const lineReveal = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.9, ease: EASE } },
};

const chipClass =
  'inline-flex items-center gap-1.5 rounded-md border border-black/10 px-3 py-1.5 text-[11px] font-medium leading-none text-black sm:px-[12px] sm:text-[13px] min-[1400px]:text-[16px]';

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(null);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return isDesktop;
}

/* ------------------------------------------------------------------ */
/* HomeHero                                                            */
/* ------------------------------------------------------------------ */
export default function HomeHero() {
  const reduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(INITIAL_SLIDE);
  const prevIndex = useRef(INITIAL_SLIDE);

  // Swiper (re)mount hone par state sync
  const handleSwiperInit = (swiper) => {
    prevIndex.current = swiper.realIndex;
    setActiveIndex(swiper.realIndex);
  };

  // Active slide badalte hi circle rotate (loop wrap-around handle karke)
  const handleRealIndexChange = (swiper) => {
    const total = SLIDES.length;
    const next = swiper.realIndex;
    let diff = next - prevIndex.current;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    prevIndex.current = next;
    setActiveIndex(next);
    setRotation((r) => r + diff * ROTATE_STEP);
  };

  return (
    <section className="pb-1.5 pt-[14px] sm:px-[14px] sm:pb-2">
      {/* isolate = apna stacking context. z-order: bg(0) < circle(10) < content/slider(20) */}
      <div className="relative overflow-hidden rounded-[10px] bg-black sm:rounded-[14px] lg:h-[calc(100svh-90px)] lg:min-h-[720px]">
        {/* Layer 1 — sabse neeche: background image */}
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <Image
            src={process.env.IMG_PATH + 'images/home/hero-bg-image.svg'}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
        </div>

        {/* Layer 2 — bg ke upar, content ke neeche: circle */}
        <div
          className="pointer-events-none absolute -right-[120px] top-[2%] w-[280px] sm:-right-[160px] sm:w-[380px] md:top-[4%] md:w-[440px] lg:-right-[12vw] lg:top-[50%] lg:w-[33vw] lg:min-w-[340px] lg:-translate-y-1/2 xl:w-[734px] min-[1400px]:left-[calc(50%+510px)] min-[1400px]:right-auto min-[1400px]:w-[30vw]"
          style={{ zIndex: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <motion.img
              src={process.env.IMG_PATH + 'images/home/hero-circel.svg'}
              alt=""
              draggable={false}
              className="block h-auto w-full select-none"
              animate={{ rotate: rotation }}
              transition={{ duration: 1.4, ease: EASE }}
            />
          </motion.div>
        </div>

        {/* Layer 3 — sabse upar: main content + slider */}
        <div
          className="relative mx-auto flex h-full custom-container flex-col pb-10 pt-12 sm:pt-16 lg:grid lg:min-h-0 lg:grid-cols-[1fr_380px] lg:grid-rows-1 lg:items-center lg:gap-10 lg:py-0 xl:grid-cols-[1fr_502px] min-[1400px]:grid-cols-[1fr_502px] min-[1400px]:px-0"
          style={{ zIndex: 2 }}
        >
          {/* ================= LEFT: content ================= */}
          {/* whileInView hata ke animate="show": hero page load par hi dikhna chahiye */}
          <motion.div variants={container} initial="hidden" animate="show" className="relative">
            {/* Clutch badge */}
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <div className="inline-flex h-10 items-center gap-2.5 rounded-full bg-[#FFFFFF1A] px-4 sm:h-11 sm:gap-3">
                <Image
                  src={process.env.IMG_PATH + 'images/home/clutch-icon.svg'}
                  width={62}
                  height={17}
                  alt=""
                  quality={100}
                  unoptimized
                />
                <span className="text-sm font-bold text-white sm:text-[18px]">4.9/5.0</span>
                <span className="flex gap-0.5" aria-label="5 star rating">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={16} strokeWidth={0} className="fill-[#FFD43B] text-[#FFD43B]" />
                  ))}
                </span>
              </div>
            </motion.div>

            {/* Heading */}
            <h1 className="font-clash mt-6 text-[28px] leading-[1.32] min-[400px]:text-[28px] sm:mt-8 sm:text-[36px] lg:text-[34px] xl:text-[40px] min-[1400px]:text-[48px]">
              <span className="block overflow-hidden py-[0.06em] font-tight">
                <motion.span variants={lineReveal} className="block font-light text-white/85">
                  Education Marketing Agency
                </motion.span>
              </span>
              <span className="block overflow-hidden py-[0.06em]">
                <motion.span variants={lineReveal} className="block font-medium text-white">
                  That Obsesses Over Growing
                  <br className="hidden sm:block" /> Brands &amp; Admissions
                </motion.span>
              </span>
            </h1>

            {/* Buttons */}
            <motion.div variants={fadeUp} className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
              {/* ── Blue CTA button ── */}
              <motion.div whileTap={{ scale: 0.96 }} className="group relative">
                {/* Outer glow ring that pulses on hover */}
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full"
                  initial={{ boxShadow: '0px 0px 50px 0px #0954FDBF' }}
                  whileHover={{ boxShadow: '0px 0px 72px 8px #0954FDCC, 0px 0px 24px 2px #0954FD80' }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
                <Link
                  href="/contact"
                  className="relative inline-flex h-[52px] text-[16px] items-center gap-3 rounded-full pl-5 pr-3 text-base font-medium text-white ring-1 ring-white/30 sm:h-14 sm:pl-6 overflow-hidden"
                >
                  {/* bg image layer – scales up independently on hover */}
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-[url('/images/home/button-img.webp')] bg-cover bg-center"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.12 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                  {/* Shimmer sweep */}
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full"
                    initial={{ backgroundPosition: '-200% center', opacity: 0 }}
                    whileHover={{ backgroundPosition: '200% center', opacity: 1 }}
                    transition={{ duration: 0.65, ease: 'easeInOut' }}
                    style={{
                      background:
                        'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)',
                      backgroundSize: '250% 100%',
                    }}
                  />
                  {/* Text + avatars sit on top */}
                  <span className="relative z-10">Let&apos;s Talk</span>
                  {/* 3 avatars: expanded -> overlap hoke single ellipse -> wapas expand (loop) */}
                  <span
                    className="relative z-10 block"
                    style={{ width: AVATAR_SIZE + AVATAR_STEP * 2, height: AVATAR_SIZE }}
                    aria-hidden="true"
                  >
                    {AVATARS.map((src, i) => (
                      <motion.span
                        key={src}
                        className="absolute top-0 block overflow-hidden rounded-full border-2 border-white bg-white"
                        style={{
                          width: AVATAR_SIZE,
                          height: AVATAR_SIZE,
                          left: i * AVATAR_STEP,
                          zIndex: AVATARS.length - i,
                        }}
                        animate={
                          reduceMotion ? undefined : { x: [0, 0, (1 - i) * AVATAR_STEP, (1 - i) * AVATAR_STEP, 0] }
                        }
                        transition={{
                          duration: 6,
                          times: [0, 0.35, 0.5, 0.85, 1],
                          ease: 'easeInOut',
                          repeat: Infinity,
                        }}
                      >
                        <Image
                          src={process.env.IMG_PATH + src}
                          alt=""
                          width={AVATAR_SIZE * 2}
                          height={AVATAR_SIZE * 2}
                          className="size-full object-cover"
                        />
                      </motion.span>
                    ))}
                  </span>
                </Link>
              </motion.div>

              {/* ── Outline button ── */}
              <motion.div whileTap={{ scale: 0.96 }} className="group relative">
                {/* Hover border glow */}
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full"
                  initial={{ boxShadow: '0 0 0px 0px rgba(255,255,255,0)' }}
                  whileHover={{ boxShadow: '0 0 18px 2px rgba(255,255,255,0.18)' }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
                <Link
                  href="/our-work"
                  className="relative inline-flex h-[52px] items-center gap-3 rounded-full border border-white/70 pl-5 pr-2.5 text-base font-medium text-white overflow-hidden sm:h-14 sm:pl-6"
                >
                  {/* Subtle fill sweep on hover */}
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.38, ease: EASE }}
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  />
                  <span className="relative z-10">Explore our work</span>
                  {/* Arrow icon circle – bounces diagonally on hover */}
                  <motion.span
                    className="relative z-10 flex size-9 items-center justify-center rounded-full bg-[#0954FD]"
                    whileHover={{ x: 3, y: -3 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  >
                    <ArrowUpRight size={18} strokeWidth={2.4} />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.div
              variants={fadeUp}
              className="mt-8 max-w-[690px] space-y-1.5 text-sm leading-7 text-white/90 sm:mt-12 sm:text-[18px] lg:mt-14"
            >
              <p>Mediagarh is a brand-building agency for schools, colleges, and universities.</p>
              <p>We help the top &amp; up-and-coming institutions fill seats and build a firm market placement.</p>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT: slider ================= */}
          {/* Desktop (lg+) vertical, tab/mobile horizontal */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: EASE }}
            className="relative mt-12 min-w-0 lg:mt-0 lg:h-full"
          >
            {/* Desktop par absolute: Swiper ki height grid ko push nahi karegi,
                isse left content apni jagah rahega aur slider ko fixed height milegi */}
            <div className="w-full lg:absolute lg:inset-0 lg:overflow-hidden">
              {isDesktop !== null && (
                <Swiper
                  // direction badalne par poora Swiper remount: loop clones sahi bante hain
                  key={isDesktop ? 'vertical' : 'horizontal'}
                  modules={[Autoplay]}
                  direction={isDesktop ? 'vertical' : 'horizontal'}
                  spaceBetween={isDesktop ? 24 : 14}
                  loop
                  loopAdditionalSlides={3}
                  centeredSlides
                  slidesPerView="auto"
                  initialSlide={INITIAL_SLIDE}
                  speed={900}
                  autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
                  onSwiper={handleSwiperInit}
                  onRealIndexChange={handleRealIndexChange}
                  className="w-full lg:h-full"
                >
                  {SLIDES.map((slide, i) => {
                    const isActive = i === activeIndex;
                    return (
                      <SwiperSlide key={slide.id} className="h-auto! w-[78%]! sm:w-[56%]! md:w-[44%]! lg:w-full!">
                        {/* Active card white frame, baaki apne accent color me */}
                        <motion.div
                          className="rounded-[18px] p-2.5 sm:p-3 min-[1400px]:rounded-[22px]"
                          animate={{
                            backgroundColor: isActive ? '#FFFFFF' : slide.accent,
                            scale: isActive ? 1 : 0.97,
                          }}
                          transition={{ duration: 0.6, ease: EASE }}
                        >
                          <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-black">
                            <Image
                              src={process.env.IMG_PATH + slide.img}
                              alt={`${slide.brand} website preview`}
                              fill
                              quality={100}
                              unoptimized
                              sizes="(min-width: 1400px) 480px, (min-width: 1024px) 380px, 80vw"
                              className="object-cover"
                            />
                          </div>

                          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-1.5 rounded-xl bg-white p-2 sm:mt-3 sm:gap-2 sm:p-2.5">
                            <Image
                              src={process.env.IMG_PATH + 'images/home/fuxam-logo.webp'}
                              width={82}
                              height={21}
                              quality={100}
                              alt=""
                            />
                            <span className={chipClass}>
                              <TrendingUp size={14} strokeWidth={2.2} className="shrink-0" />
                              {slide.roas} ROAS Increase
                            </span>
                            <span className={chipClass}>
                              <Users size={14} strokeWidth={2.2} className="shrink-0" />
                              {slide.admissions} Admissions
                            </span>
                          </div>
                        </motion.div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
