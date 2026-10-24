import { useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionTemplate, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */
const EASE = [0.22, 1, 0.36, 1];

// Week labels: Start, Week 2 ... Week 8 (screenshot ke exact % positions)
const WEEKS = ['Start', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'];
const weekLeft = (i) => 4.7 + i * 12.86; // % (label + vertical line ka center)

const STEPS = [
  {
    id: 'discovery',
    title: 'Discovery & Funnel Strategy',
    badge: 'Kick-off',
    weeks: 'Week 1-2',
    icon: 'images/home/quick_reference_all.svg',
    color: '#D9942280',
    left: 3.4,
    top: 48,
    indent: 0,
  },
  {
    id: 'build',
    title: 'Creatives, Website & Landing Pages',
    badge: 'Build',
    weeks: 'Week 2-4',
    icon: 'images/home/format_image_left.svg',
    color: '#BEF29180',
    left: 21.1,
    top: 138,
    indent: 3,
  },
  {
    id: 'launch',
    title: 'Google & Meta Campaigns Go Live',
    badge: 'Launch',
    weeks: 'Week 4-5',

    icon: 'images/home/ads_click.svg',
    color: '#28A0BE80',
    left: 38.6,
    top: 227,
    indent: 6,
  },
  {
    id: 'nurture',
    title: 'Lead Nurturing & Optimisation',
    badge: 'Primary Phase',
    weeks: 'Week 5-7',
    icon: 'images/home/headset_mic.svg',
    color: '#24AA6480',
    left: 56.2,
    top: 317,
    indent: 9,
  },
  {
    id: 'convert',
    title: 'Admissions & Reporting',
    badge: 'Convert',
    weeks: 'Week 6-8',
    icon: 'images/home/article_person.svg',
    color: '#965AD280',
    left: 76.1,
    top: 408,
    indent: 12,
  },
];

// Scroll progress (0 -> 1) me har card ka apna window: pehla poora, phir doosra...
const STEP_WINDOW = 0.12; // 5 cards => 0.8 par sab complete

/* ------------------------------------------------------------------ */
/* Motion variants                                                     */
/* ------------------------------------------------------------------ */
const headFade = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.1 },
  }),
};

const labelFade = {
  hidden: { opacity: 0, y: -10 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: 0.1 + i * 0.06 },
  }),
};

const lineGrow = {
  hidden: { scaleY: 0 },
  show: (i = 0) => ({
    scaleY: 1,
    transition: { duration: 1, ease: EASE, delay: 0.2 + i * 0.07 },
  }),
};

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */
function TimelineCard({ item, index, progress, reduce }) {
  const start = index * STEP_WINDOW;
  const end = start + STEP_WINDOW;

  // inset right: 100% (width 0) -> 0% (actual width), scroll ke saath
  const hidden = useTransform(progress, [start, end], [100, 0]);
  const clipPath = useMotionTemplate`inset(0px ${hidden}% 0px 0px round 10px)`;

  return (
    <motion.div
      style={{
        clipPath: reduce ? undefined : clipPath,
        '--ml': `${item.indent}%`,
        '--left': `${item.left}%`,
        '--top': `${item.top}px`,
      }}
      className="ml-[var(--ml)] rounded-[10px] border border-white/10 bg-gradient-to-b from-white/[0.14] to-white/[0.05] p-2.5 backdrop-blur-sm sm:p-3 xl:absolute xl:left-[var(--left)] xl:top-[var(--top)] xl:ml-0 xl:w-max xl:whitespace-nowrap"
    >
      <div className="flex items-center gap-3">
        <span
          className="flex size-11 shrink-0 items-center justify-center rounded-md sm:size-12"
          style={{ backgroundColor: item.color }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={process.env.IMG_PATH + item.icon}
            alt=""
            draggable={false}
            className="size-[22px] object-contain sm:size-6"
          />
        </span>

        <div className="min-w-0">
          <h3 className="text-[14px] font-medium leading-snug text-white sm:text-[16px] xl:text-[18px]">
            {item.title}
          </h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <span className="rounded-[3px] bg-[#BEF291] px-2 py-[5px] text-[9px] font-semibold uppercase leading-none tracking-wide text-black sm:text-[10px]">
              {item.badge}
            </span>
            <span className="rounded-[3px] border border-white/25 bg-black/30 px-2 py-[4px] text-[9px] font-medium uppercase leading-none tracking-wide text-white sm:text-[10px]">
              {item.weeks}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function AdmissionTimeline() {
  const reduce = useReducedMotion();
  const panelRef = useRef(null);

  // Panel viewport me aate hi progress shuru, beech tak pahunchte hi complete
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ['start 0.85', 'end 0.5'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  return (
    <section className="overflow-hidden bg-white py-[44px] sm:py-[64px] lg:py-[80px]">
      <div className="custom-container">
        {/* ============ Header ============ */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[650px]">
            <motion.h2
              variants={headFade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="font-clash text-[28px] font-medium leading-tight text-black sm:text-[32px] lg:text-[48px]"
            >
              How we{' '}
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
                fill your seats
              </span>
            </motion.h2>
            <motion.p
              variants={headFade}
              custom={1}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="mt-[18px] text-[16px] leading-7 text-black sm:text-[18px] lg:mt-[24px]"
            >
              A typical 8-week admission campaign, run end to end by one team.
            </motion.p>
          </div>

          <motion.div
            variants={headFade}
            custom={2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="md:mt-4"
          >
            <Link
              href="/contact"
              className="group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full bg-white pl-5 pr-2 text-[16px] font-medium text-black shadow-[-4px_4px_14px_0px_#0000001F,-17px_17px_25px_0px_#0000001A,-39px_39px_33px_0px_#0000000F,-70px_70px_39px_0px_#00000005,-109px_109px_43px_0px_#00000000] transition-colors duration-500 hover:text-white sm:h-14 sm:pl-6"
            >
              <span
                aria-hidden="true"
                className="absolute right-2 top-1/2 size-9 -translate-y-1/2 rounded-full bg-[#0954FD] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[14] sm:size-10"
              />
              <span className="relative z-10">Plan My Admission Season</span>
              <span className="relative z-10 flex size-9 items-center justify-center text-white sm:size-10">
                <ArrowRight
                  size={18}
                  strokeWidth={2.4}
                  className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-[20deg]"
                />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* ============ Timeline ============ */}
        <div className="mt-8 sm:mt-10 xl:mt-12">
          {/* Week labels (sirf desktop gantt par) */}
          <div className="relative mb-3 hidden h-6 xl:block">
            {WEEKS.map((label, i) => (
              <motion.span
                key={label}
                variants={labelFade}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.8 }}
                className="absolute top-0 -translate-x-1/2 whitespace-nowrap text-[15px] leading-6 text-black"
                style={{ left: `${weekLeft(i)}%` }}
              >
                {label}
              </motion.span>
            ))}
          </div>

          {/* Black panel */}
          <div
            ref={panelRef}
            className="relative isolate overflow-hidden rounded-[14px] bg-black bg-[url('/images/home/timeline-bg.webp')] bg-center xl:h-[526px] xl:rounded-[16px]"
          >
            {/* Week vertical lines (sirf desktop gantt par) */}
            <div className="pointer-events-none absolute inset-0 z-[1] hidden xl:block" aria-hidden="true">
              {WEEKS.map((label, i) => (
                <motion.span
                  key={label}
                  variants={lineGrow}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="absolute inset-y-0 w-px origin-top bg-gradient-to-b from-white/15 to-white/5"
                  style={{ left: `${weekLeft(i)}%` }}
                />
              ))}
            </div>

            {/* Cards: mobile/tablet par staircase list, xl par absolute gantt */}
            <div className="relative z-10 flex flex-col gap-3 p-4 sm:gap-4 sm:p-6 xl:absolute xl:inset-0 xl:block xl:p-0">
              {STEPS.map((item, i) => (
                <TimelineCard key={item.id} item={item} index={i} progress={progress} reduce={reduce} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
