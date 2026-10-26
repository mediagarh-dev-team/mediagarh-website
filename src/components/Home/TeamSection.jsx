'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */
const EASE = [0.22, 1, 0.36, 1];

/*
  Order screenshot ke hisaab se: columns left -> right, har column me upar -> neeche.
  name/role: TODO real naam aur designation bhar do, alt + title isi se ban jaate hain.
*/
const TEAM = [
  { file: 'images/home/team-member-img-1.webp', name: 'Team Member 1', role: 'Mediagarh Team' },
  { file: 'images/home/team-member-img-13.webp', name: 'Team Member 13', role: 'Mediagarh Team' },
  { file: 'images/home/team-member-img-3.webp', name: 'Team Member 3', role: 'Mediagarh Team' },
  { file: 'images/home/team-member-img-5.webp', name: 'Team Member 5', role: 'Mediagarh Team' },
  { file: 'images/home/team-member-img-10.webp', name: 'Team Member 10', role: 'Mediagarh Team' },
  { file: 'images/home/team-member-img-8.webp', name: 'Team Member 8', role: 'Mediagarh Team' },
  { file: 'images/home/team-member-img-9.webp', name: 'Team Member 9', role: 'Mediagarh Team' },
  { file: 'images/home/team-member-img-7.webp', name: 'Team Member 7', role: 'Mediagarh Team' },
  { file: 'images/home/team-member-img-12.webp', name: 'Team Member 12', role: 'Mediagarh Team' },
  { file: 'images/home/team-member-img-11.webp', name: 'Team Member 11', role: 'Mediagarh Team' },
  { file: 'images/home/team-member-img-6.webp', name: 'Team Member 6', role: 'Mediagarh Team' },
  { file: 'images/home/team-member-img-2.webp', name: 'Team Member 2', role: 'Mediagarh Team' },
  { file: 'images/home/team-member-img-4.webp', name: 'Team Member 4', role: 'Mediagarh Team' },
];

// Placeholder gradients
const GRAD_TOP_DOWN = 'linear-gradient(180deg, #FFF 0%, #F0F0F0 100%)'; // photo ke upar wale tiles
const GRAD_BOTTOM_UP = 'linear-gradient(180deg, #F0F0F0 0%, #FFF 100%)'; // photo ke neeche wale tiles

/*
  Column layout (screenshot ke hisaab se, left -> right, top -> bottom)
  I = photo tile
  A = placeholder, gradient #FFF -> #F0F0F0 (photo ke upar)
  B = placeholder, gradient #F0F0F0 -> #FFF (photo ke neeche)
  offset: odd columns thode neeche se start hote hain
  Ab saare 9 columns har screen size par dikhte hain.
*/
const COLUMNS = [
  { tiles: ['I', 'B', 'I', 'B'], offset: true },
  { tiles: ['A', 'I', 'B', 'I'], offset: false },
  { tiles: ['A', 'I', 'B'], offset: true },
  { tiles: ['A', 'I'], offset: false },
  { tiles: ['A', 'I'], offset: true },
  { tiles: ['A', 'I'], offset: false },
  { tiles: ['A', 'I', 'B'], offset: true },
  { tiles: ['A', 'I', 'B', 'I'], offset: false },
  { tiles: ['I', 'B', 'I', 'B'], offset: true },
];

// Har photo tile ko ek global index (0..12) milta hai
let photoCounter = 0;
const COLUMNS_WITH_INDEX = COLUMNS.map((col) => ({
  ...col,
  tiles: col.tiles.map((t) => (t === 'I' ? { type: 'I', index: photoCounter++ } : { type: t })),
}));
const PHOTO_COUNT = photoCounter;

/* ------------------------------------------------------------------ */
/* Motion variants                                                     */
/* ------------------------------------------------------------------ */
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const columnVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};
const textVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
// Parallax ka amplitude screen ke hisaab se (thoda sa hi move hoga)
function useParallaxAmount() {
  const [amp, setAmp] = useState(34);
  useEffect(() => {
    const update = () => setAmp(window.innerWidth < 640 ? 10 : window.innerWidth < 1024 ? 22 : 36);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return amp;
}

// Mobile par radius chhota, sm se 8px
const tileShape = 'aspect-[106/143] w-full rounded-[4px] sm:rounded-[8px]';

/* ------------------------------------------------------------------ */
/* Tiles                                                               */
/* ------------------------------------------------------------------ */
function PlaceholderTile({ gradient }) {
  return <div className={tileShape} style={{ background: gradient }} />;
}

// Back side (placeholder gradient) -> front side (photo) flip
function PhotoTile({ member, flipped, instant, delay }) {
  return (
    <div className={`relative [perspective:900px] ${tileShape}`}>
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d' }}
        initial={false}
        animate={{ rotateY: flipped ? 0 : 180 }}
        transition={instant ? { duration: 0 } : { duration: 0.9, ease: EASE, delay: flipped ? delay : 0 }}
      >
        {/* Front: photo */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[4px] sm:rounded-[8px]"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <Image
            src={process.env.IMG_PATH + member.file}
            alt={`${member.name}, ${member.role} at Mediagarh`}
            title={member.name}
            fill
            sizes="(min-width: 1024px) 11vw, 12vw"
            className="object-cover"
            quality={100}
            unoptimized
          />
        </div>

        {/* Back: placeholder */}
        <div
          className="absolute inset-0 rounded-[4px] sm:rounded-[8px]"
          style={{
            background: GRAD_BOTTOM_UP,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        />
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Column                                                              */
/* ------------------------------------------------------------------ */
function TeamColumn({ col, colIndex, progress, amp, flipped, delays, instant }) {
  // Odd/even columns opposite direction me thodi thodi move
  const goesUp = colIndex % 2 === 0;
  const y = useTransform(progress, [0, 1], goesUp ? [amp, -amp] : [-amp, amp]);

  return (
    <motion.div variants={columnVariants} className={`flex min-w-0 flex-1 flex-col ${col.offset ? 'mt-[4%]' : ''}`}>
      <motion.div style={{ y }} className="flex flex-col gap-1 sm:gap-2 lg:gap-3">
        {col.tiles.map((tile, i) => {
          if (tile.type === 'I') {
            return (
              <PhotoTile
                key={i}
                member={TEAM[tile.index]}
                flipped={flipped[tile.index]}
                delay={delays[tile.index]}
                instant={instant}
              />
            );
          }
          return <PlaceholderTile key={i} gradient={tile.type === 'A' ? GRAD_TOP_DOWN : GRAD_BOTTOM_UP} />;
        })}
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function TeamSection() {
  const reduce = useReducedMotion();
  const wrapRef = useRef(null);
  const amp = useParallaxAmount();

  // Section ke scroll ka progress (0 -> 1)
  // Parallax: poore section ke scroll par
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start end', 'end start'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  // Flip: section ka top viewport ke 40% par pahunchte hi progress = 1 (tab tak SAB photos flip ho chuki hoti hain)
  const { scrollYProgress: flipProgress } = useScroll({ target: wrapRef, offset: ['start end', 'start 0.4'] });

  // Flip state: har photo ka random threshold, scroll progress us se upar jaate hi flip
  const [flipped, setFlipped] = useState(() => Array(PHOTO_COUNT).fill(false));
  const thresholds = useRef(null);
  const [delays, setDelays] = useState(() => Array(PHOTO_COUNT).fill(0)); // flip ka chhota random delay

  const update = (v) => {
    if (!thresholds.current) return;
    setFlipped((prev) => {
      const next = thresholds.current.map((t) => v >= t);
      return next.every((n, i) => n === prev[i]) ? prev : next;
    });
  };

  useEffect(() => {
    // client par hi random (SSR/hydration mismatch nahi hoga)
    // max 0.85 < 1, isliye progress 1 par har photo flip ho jaati hai
    thresholds.current = Array.from({ length: PHOTO_COUNT }, () => 0.05 + Math.random() * 0.8);
    setDelays(Array.from({ length: PHOTO_COUNT }, () => Math.random() * 0.5));
    update(flipProgress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(flipProgress, 'change', update);

  const allFlipped = Array(PHOTO_COUNT).fill(true);
  const flipState = reduce ? allFlipped : flipped;

  return (
    <section className="overflow-hidden bg-white py-[44px] sm:py-[64px] lg:py-[80px]">
      <div className="custom-container-2 px-3 sm:px-4">
        <div ref={wrapRef} className="relative">
          {/* ============ Columns ============ */}
          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="flex items-start gap-1 sm:gap-2 md:min-h-[620px] lg:min-h-0 lg:gap-3"
          >
            {COLUMNS_WITH_INDEX.map((col, i) => (
              <TeamColumn
                key={i}
                col={col}
                colIndex={i}
                progress={smooth}
                amp={reduce ? 0 : amp}
                flipped={flipState}
                delays={delays}
                instant={!!reduce}
              />
            ))}
          </motion.div>

          {/* ============ Center content ============ */}
          <div className="relative z-10 mt-8 md:absolute md:left-1/2 md:top-[75%] md:mt-0 md:w-[44%] md:-translate-x-1/2 md:-translate-y-1/2 lg:w-[34%] lg:max-w-[480px]">
            <motion.div
              variants={textVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="flex flex-col items-center text-center"
            >
              <motion.h2
                variants={fadeUp}
                className="font-clash text-[26px] font-medium leading-[1.25] text-black sm:text-[32px] lg:text-[48px]"
              >
                <span
                  className="bg-clip-text font-semibold text-transparent"
                  style={{
                    backgroundImage: `url(${process.env.IMG_PATH}images/home/text-bg-grident-img.svg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    WebkitBackgroundClip: 'text',
                  }}
                >
                  The Minds
                </span>{' '}
                Behind
                <br />
                The Work
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-4 text-[14px] leading-[1.7] text-black sm:text-[18px] lg:mt-5">
                A team of strategists, designers and developers working together from the first ideas to the outcome.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-6 lg:mt-7">
                <Link
                  href="/contact"
                  className="group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full bg-white pl-5 pr-2 text-[16px] font-medium text-black shadow-[-4px_4px_14px_0px_#0000001F,-17px_17px_25px_0px_#0000001A,-39px_39px_33px_0px_#0000000F,-70px_70px_39px_0px_#00000005,-109px_109px_43px_0px_#00000000] transition-colors duration-500 hover:text-white sm:h-14 sm:pl-6"
                >
                  <span
                    aria-hidden="true"
                    className="absolute right-2 top-1/2 size-9 -translate-y-1/2 rounded-full bg-[#0954FD] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[14] sm:size-10"
                  />
                  <span className="relative z-10">Schedule a Call</span>
                  <span className="relative z-10 flex size-9 items-center justify-center text-white sm:size-10">
                    <ArrowRight
                      size={18}
                      strokeWidth={2.4}
                      className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-[20deg]"
                    />
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
