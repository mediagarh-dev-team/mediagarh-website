import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

const ROWS = [
  {
    label: 'Education-only focus',
    ours: 'We work only with schools, colleges and universities, so we know how students and parents decide.',
    theirs: 'They market a restaurant on Monday and a college on Tuesday.',
  },
  {
    label: 'Proven framework',
    ours: 'Our LGN-90™ framework has delivered 80,000+ admissions for 150+ institutions.',
    theirs: 'They run ads with no strategy behind them.',
  },
  {
    label: 'Admission-first goals',
    ours: 'Every campaign is measured by enquiries and admissions, not likes.',
    theirs: 'They report reach and impressions and call it success.',
  },
  {
    label: 'Constant testing',
    ours: 'We test creatives, audiences and landing pages every week and scale what works.',
    theirs: 'The same A/B tests, repeated without results.',
  },
  {
    label: 'No lead left behind',
    ours: 'Automated WhatsApp and CRM follow-ups keep every enquiry warm.',
    theirs: 'They hand over a lead sheet and the job ends there.',
  },
  {
    label: 'Real-time reporting',
    ours: 'Your team is one click away, with live updates on spend and results.',
    theirs: 'Reports arrive late and communication breaks down.',
  },
];

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

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

const slideIn = {
  hidden: { opacity: 0, x: -24 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

const vp = { once: true, amount: 0.5 };

// Shared card look
const cardBase = 'rounded-[8px] border border-black/[0.06] bg-[#F4F4F4] p-3 sm:p-5 lg:px-6 lg:py-5';
const headerHeight = 'h-[72px] sm:h-[88px] lg:h-[100px]';
const cardText = 'text-[13px] leading-[1.55] sm:text-[15px] lg:text-[16px]';

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function WhyMediagarh() {
  return (
    <section className="overflow-hidden bg-white py-[44px] sm:py-[64px] lg:py-[80px]">
      <div className="custom-container">
        {/* ============ Header ============ */}
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <motion.h2
            variants={headFade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="font-clash max-w-[660px] text-[28px] font-medium leading-[1.25] text-black sm:text-[32px] lg:text-[48px]"
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
              Why Mediagarh
            </span>{' '}
            and not another marketing agency?
          </motion.h2>

          <motion.p
            variants={headFade}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="text-[16px] leading-7 text-black md:max-w-[456px]"
          >
            We know what your last agency did wrong. <strong className="font-semibold">Let us fix that.</strong>
          </motion.p>
        </div>

        {/* ============ Comparison table ============ */}
        {/* Mobile/tablet: 2 columns (label upar, neeche dono cards). lg+: 3 columns */}
        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-3 sm:mt-10 sm:gap-x-4 lg:mt-12 lg:grid-cols-[200px_minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-6 xl:grid-cols-[265px_minmax(0,1fr)_minmax(0,1fr)]">
          {/* ---------- Header row ---------- */}
          <div className="hidden lg:block" />

          {/* Mediagarh logo card: dark bg + bottom shade image */}
          <motion.div
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className={`relative isolate flex items-center justify-center overflow-hidden rounded-[8px] bg-black ${headerHeight}`}
          >
            <motion.img
              src={process.env.IMG_PATH + 'images/home/active-tab-bg-img.svg'}
              alt=""
              draggable={false}
              className="pointer-events-none absolute bottom-0 left-0 z-0 h-full w-full select-none object-cover object-bottom"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
            />
            <motion.img
              src={process.env.IMG_PATH + 'images/home/logo.svg'}
              alt="Mediagarh"
              draggable={false}
              className="relative z-10 h-[22px] w-auto select-none sm:h-[30px] lg:h-[36px]"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            />
          </motion.div>

          {/* Other Agencies */}
          <motion.div
            variants={rise}
            custom={0.12}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className={`flex items-center justify-center rounded-[8px] border border-black/[0.06] bg-[#F4F4F4] px-2 text-center ${headerHeight}`}
          >
            <span className="text-[15px] font-semibold text-black sm:text-[18px] lg:text-[20px]">Other Agencies</span>
          </motion.div>

          {/* ---------- Rows ---------- */}
          {ROWS.map((row) => (
            <RowCells key={row.label} row={row} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Row (3 grid cells: label, ours, theirs)                             */
/* ------------------------------------------------------------------ */
function RowCells({ row }) {
  return (
    <>
      {/* Label */}
      <motion.div
        variants={slideIn}
        initial="hidden"
        whileInView="show"
        viewport={vp}
        className="col-span-2 mt-3 flex items-center text-[15px] font-semibold text-black sm:text-[16px] lg:col-span-1 lg:mt-0 lg:border-b lg:border-black/10 lg:pb-3 lg:font-normal"
      >
        {row.label}
      </motion.div>

      {/* Mediagarh */}
      <motion.div
        variants={rise}
        custom={0.1}
        initial="hidden"
        whileInView="show"
        viewport={vp}
        whileHover={{ y: -3 }}
        className={`flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-3 ${cardBase}`}
      >
        <motion.span
          initial={{ scale: 0, rotate: -90 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={vp}
          transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.45 }}
          className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#1A76FF] text-white sm:size-6"
        >
          <Check size={12} strokeWidth={3.5} />
        </motion.span>
        <p className={`font-medium text-black ${cardText}`}>{row.ours}</p>
      </motion.div>

      {/* Other agencies */}
      <motion.div
        variants={rise}
        custom={0.2}
        initial="hidden"
        whileInView="show"
        viewport={vp}
        className={`flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-3 ${cardBase}`}
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={vp}
          transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
          className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#C9C9C9] text-white sm:size-6"
        >
          <X size={12} strokeWidth={3.5} />
        </motion.span>
        <p className={`text-black/50 ${cardText}`}>{row.theirs}</p>
      </motion.div>
    </>
  );
}
