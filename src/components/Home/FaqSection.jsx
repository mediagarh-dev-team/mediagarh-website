'use client';
import { useId, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Mail } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */
const EASE = [0.22, 1, 0.36, 1];

// Tum manually add karoge, path apne hisaab se badal lo
const PANKAJ_IMG = 'images/home/pankaj-sir.webp';
const CONTACT_EMAIL = 'pankaj@mediagarh.com';

// Sirf pehle sawal ka answer screenshot se hai, baaki placeholders hain (TODO: real answers)
const FAQS = [
  {
    q: 'What is Mediagarh, and what do they specialize in?',
    a: 'Mediagarh offers digital marketing for educational institutions through its special set of services, which include performance marketing, SEO, creative branding, etc. They have special expertise in scaling educational brands digitally to drive admissions growth.',
  },
  { q: 'What kind of institutions does Mediagarh work with?', a: 'TODO: add answer.' },
  { q: 'Where is Mediagarh located?', a: 'TODO: add answer.' },
  { q: 'What services does your agency offer?', a: 'TODO: add answer.' },
  { q: 'What kind of deliverables can I expect?', a: 'TODO: add answer.' },
  { q: 'What if I only need certain services?', a: 'TODO: add answer.' },
  { q: 'Can you work with our existing team?', a: 'TODO: add answer.' },
  { q: 'Who will work on my project?', a: 'TODO: add answer.' },
  { q: 'Do you work with newly established schools, colleges, etc.?', a: 'TODO: add answer.' },
  { q: 'Can you work on tight deadlines in case of events in the institute?', a: 'TODO: add answer.' },
];

/* ------------------------------------------------------------------ */
/* Motion variants                                                     */
/* ------------------------------------------------------------------ */
const leftContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* ------------------------------------------------------------------ */
/* Accordion item                                                      */
/* ------------------------------------------------------------------ */
function FaqItem({ item, open, onToggle, index }) {
  const uid = useId();
  const buttonId = `${uid}-button`;
  const panelId = `${uid}-panel`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: EASE, delay: Math.min(index, 4) * 0.05 }}
      className="border-b border-black/10"
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-4 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#1A76FF] focus-visible:ring-offset-2 sm:py-6 lg:py-7"
        >
          <span className="text-[15px] font-medium leading-snug text-black sm:text-[17px] lg:text-[18px]">
            {item.q}
          </span>

          <span
            className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 sm:size-9 ${
              open ? 'bg-[#1A76FF] text-white' : 'bg-[#F0F0F0] text-black/50 group-hover:bg-[#E4E4E4]'
            }`}
          >
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex"
            >
              <ChevronDown size={16} strokeWidth={2.2} />
            </motion.span>
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.45, ease: EASE }, opacity: { duration: 0.3 } }}
            className="overflow-hidden"
          >
            <p className="max-w-[860px] pb-6 text-[14px] leading-[1.75] text-black/80 sm:text-[15px] lg:pb-7 lg:text-[16px]">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0); // pehla open, ek time par ek hi

  return (
    <section className="bg-white py-[44px] sm:py-[64px] lg:py-[80px]">
      <div className="custom-container">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(300px,0.31fr)_minmax(0,0.69fr)] lg:gap-12 xl:gap-[56px]">
          {/* ================= LEFT ================= */}
          <motion.div
            variants={leftContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="min-w-0 lg:sticky lg:top-28 lg:self-start"
          >
            <motion.h2
              variants={fadeUp}
              className="font-clash text-[28px] font-medium leading-[1.2] text-black sm:text-[32px] lg:text-[40px] xl:text-[48px]"
            >
              Questions we get asked often
            </motion.h2>

            <motion.p variants={fadeUp} className="mt-3 text-[15px] leading-7 text-black sm:text-[16px] lg:mt-4">
              Can’t find what you’re looking for?{' '}
              <Link
                href="/contact"
                className="font-semibold text-[#1A76FF] underline-offset-4 transition-colors hover:underline"
              >
                Contact our team
              </Link>
            </motion.p>

            {/* Book an Intro Call card */}
            <motion.div
              variants={fadeUp}
              className="mt-7 rounded-[14px] p-5 sm:p-6 lg:mt-9"
              style={{
                background:
                  'linear-gradient(180deg, rgba(26, 118, 255, 0.00) 50%, rgba(26, 118, 255, 0.10) 75%, rgba(26, 118, 255, 0.15) 100%), #F5F5F5',
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.3 }}
                className="size-[88px] overflow-hidden rounded-full bg-[#1A76FF] sm:size-[100px] lg:size-[120px]"
              >
                <Image
                  src={process.env.IMG_PATH + PANKAJ_IMG}
                  alt="Pankaj, Mediagarh"
                  title="Pankaj, Mediagarh"
                  width={240}
                  height={240}
                  className="size-full object-cover"
                />
              </motion.div>

              <h3 className="font-clash mt-5 text-[24px] font-normal leading-tight text-black sm:text-[28px] lg:mt-6 lg:text-[32px]">
                Book an Intro Call
              </h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-black sm:text-[14px] lg:mt-3">
                Let’s talk through your admission goals, your timeline, and how Mediagarh can help you fill your seats.
              </p>

              {/* Black button (hover par blue fill circle se expand) */}
              <Link
                href="/contact"
                className="group relative mt-5 inline-flex h-12 items-center gap-3 overflow-hidden rounded-full bg-black pl-5 pr-2 text-[15px] font-medium text-white shadow-[0px_14px_30px_0px_rgba(0,0,0,0.28)] sm:h-[54px] sm:pl-6 lg:mt-6"
              >
                <span
                  aria-hidden="true"
                  className="absolute right-2 top-1/2 size-9 -translate-y-1/2 rounded-full bg-[#1A76FF] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[14] sm:size-10"
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

              {/* Email */}
              <a href={`mailto:${CONTACT_EMAIL}`} className="group/mail mt-6 flex items-center gap-3 lg:mt-7">
                <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-[#1A76FF] transition-transform duration-300 group-hover/mail:scale-110 sm:size-12">
                  <Mail size={18} strokeWidth={2} />
                  <span className="absolute right-[11px] top-[11px] size-1.5 rounded-full bg-[#1A76FF] ring-2 ring-white sm:right-[12px] sm:top-[12px]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[14px] leading-tight text-black">Prefer email instead?</span>
                  <span className="mt-1 block truncate text-[14px] font-semibold leading-tight text-black sm:text-[16px]">
                    {CONTACT_EMAIL}
                  </span>
                </span>
              </a>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT: accordion ================= */}
          <div className="min-w-0 border-t border-transparent">
            {FAQS.map((item, i) => (
              <FaqItem
                key={item.q}
                item={item}
                index={i}
                open={openIndex === i}
                onToggle={() => setOpenIndex((cur) => (cur === i ? -1 : i))}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
