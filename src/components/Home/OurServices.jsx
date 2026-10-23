'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */
const EASE = [0.22, 1, 0.36, 1];
const ROTATE_DEG = 180; // har baar circle kitne degree ghumega
const ROTATE_EVERY_MS = 5500; // hover ke baad har 2.5 sec

const SERVICES = [
  {
    id: 'ads',
    title: 'Ads That Fill Seats',
    video: 'images/videos/service-video-1.mp4',
    tags: ['Google Ads (Search, Display, Video)', 'Meta & Instagram Ads', 'Ad Creatives & A/B Testing'],
  },
  {
    id: 'seo',
    title: 'Top of Google Search',
    video: 'images/videos/service-video-2.mp4',
    tags: ['On-Page & Technical SEO', 'AEO/GEO', 'Off-Page SEO', 'Local SEO'],
  },
  {
    id: 'websites',
    title: 'Websites That Convert',
    video: 'images/videos/service-video-3.mp4',
    tags: ['Website Development', 'Landing Pages', 'UI/UX Design', 'Speed & CRO'], // TODO
  },
  {
    id: 'brand',
    title: 'A Brand Parents Trust',
    video: 'images/videos/service-video-4.mp4',
    tags: ['Brand Identity', 'Brand Strategy', 'Videos & Shoots', 'Collateral Design'], // TODO
  },
  {
    id: 'social',
    title: 'Campus in Social Media Grids',
    video: 'images/videos/service-video-5.mp4',
    tags: ['Social Media Management', 'Reels & Short Videos', 'Content Calendar', 'Community'], // TODO
  },
  {
    id: 'crm',
    title: 'Your Personal Admission CRM',
    video: 'images/videos/service-video-6.mp4',
    tags: ['Lead Management', 'WhatsApp & Email Automation', 'Follow-up Workflows', 'Reports'], // TODO
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

const rowVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const countVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
const titleVariants = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.8, ease: EASE } },
};

/* ------------------------------------------------------------------ */
/* Row                                                                 */
/* ------------------------------------------------------------------ */
function ServiceRow({ item, index, open, onOpen, onClose, onToggle }) {
  const videoRef = useRef(null);
  const pointerType = useRef('mouse');
  const [rotation, setRotation] = useState(0);

  // Video sirf open hone par chalta hai (autoplay + loop), band hone par pause
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (open) {
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    } else {
      v.pause();
    }
  }, [open]);

  // Hover ke dauran circle har 2.5 sec me ROTATE_DEG ghumta hai
  useEffect(() => {
    if (!open) return;
    setRotation(ROTATE_DEG); // reset to 0 → ROTATE_DEG on every open
    const t = setInterval(() => setRotation((r) => r + ROTATE_DEG), ROTATE_EVERY_MS);
    return () => clearInterval(t);
  }, [open]);

  return (
    <motion.div variants={rowVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
      <div
        tabIndex={0}
        data-open={open}
        onPointerDown={(e) => {
          pointerType.current = e.pointerType;
        }}
        onPointerEnter={(e) => e.pointerType === 'mouse' && onOpen(item.id)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && onClose(item.id)}
        // touch par tap se open/close (scroll karne par trigger nahi hoga)
        onClick={() => pointerType.current !== 'mouse' && onToggle(item.id)}
        // keyboard focus par open (touch tap par nahi)
        onFocus={(e) => e.currentTarget.matches(':focus-visible') && onOpen(item.id)}
        onBlur={() => onClose(item.id)}
        className={`relative isolate cursor-default overflow-hidden border-b border-black/[0.06] outline-none transition-colors duration-500 ${
          open ? 'bg-black' : 'bg-white'
        }`}
      >
        {/* Absolute circle (right edge par half dikhta hai) */}
        <div className="pointer-events-none absolute -right-[60px] top-1/2 z-0 w-[320px] -translate-y-1/2 translate-x-1/2 sm:w-[500px] lg:w-[740px]">
          <motion.img
            src={process.env.IMG_PATH + 'images/home/services-circle.svg'}
            alt=""
            draggable={false}
            className="block h-auto w-full select-none"
            initial={false}
            animate={{ rotate: rotation, opacity: open ? 1 : 0, scale: open ? 1 : 0.9 }}
            transition={{
              rotate: { duration: 1, ease: EASE },
              opacity: { duration: 0.5 },
              scale: { duration: 0.7, ease: EASE },
            }}
          />
        </div>

        <div className="custom-container relative z-10">
          <div className="grid grid-cols-1 gap-x-6 py-[18px] sm:py-[18px] lg:grid-cols-[660px_263px_425px] lg:items-center lg:py-[18px]">
            {/* ---------- Count + Title ---------- */}
            <div className="flex min-w-0 items-center">
              {/* count ka colour hover par change nahi hota */}
              <motion.span
                variants={countVariants}
                className={`font-clash w-[26px] shrink-0 select-none whitespace-nowrap text-[72px] transition-colors duration-500  font-bold leading-none ${
                  open ? 'text-[#ffffff32]' : 'text-[#E8E8E8]'
                } sm:w-[34px] sm:text-[96px] lg:w-[40px] lg:text-[128px]`}
                aria-hidden="true"
              >
                {index + 1}
              </motion.span>

              <span className="relative z-10 block overflow-hidden py-[0.1em]">
                <motion.h3
                  variants={titleVariants}
                  className={`font-clash block text-[22px] font-semibold leading-tight transition-colors duration-500 sm:text-[28px] lg:text-[32px] xl:text-[40px] ${
                    open ? 'text-white' : 'text-black'
                  }`}
                >
                  {item.title}
                </motion.h3>
              </span>
            </div>

            {/* ---------- Center: video ---------- */}
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out lg:grid-rows-[1fr] lg:justify-self-center ${
                open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 lg:opacity-100'
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="pt-5 lg:pt-0">
                  <motion.div
                    initial={false}
                    animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.9 }}
                    transition={{ duration: 0.6, ease: EASE, delay: open ? 0.1 : 0 }}
                    className="aspect-video w-full max-w-[263px] rounded-lg bg-white lg:w-[260px] xl:w-[263px]"
                  >
                    <video
                      ref={videoRef}
                      src={process.env.IMG_PATH + item.video}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      disablePictureInPicture
                      className="size-full object-cover  rounded-lg"
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* ---------- Right: tags ---------- */}
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out lg:grid-rows-[1fr] lg:justify-self-end ${
                open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 lg:opacity-100'
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="flex flex-wrap gap-2 pt-4 lg:max-w-[400px ] lg:justify-end lg:pt-0">
                  {item.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={false}
                      animate={{ opacity: open ? 1 : 0, y: open ? 0 : 14 }}
                      transition={{ duration: 0.5, ease: EASE, delay: open ? 0.15 + i * 0.07 : 0 }}
                      className="rounded-full bg-[#FFFFFF40] px-[20px] py-[14px] text-[12px] font-medium leading-none text-white sm:text-[14px]"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function OurServices() {
  const [openId, setOpenId] = useState(null);

  const handleOpen = (id) => setOpenId(id);
  const handleClose = (id) => setOpenId((cur) => (cur === id ? null : cur));
  const handleToggle = (id) => setOpenId((cur) => (cur === id ? null : id));

  return (
    <section className="bg-white py-[44px] sm:py-[64px] lg:py-[80px]">
      {/* ============ Header ============ */}
      <div className="custom-container">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[650px]">
            <motion.h2
              variants={headFade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="font-clash text-[28px] font-medium leading-tight text-black sm:text-[32px] lg:text-[48px]"
            >
              Our{' '}
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
                Services
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
              Everything an educational institution needs to fill its seats, from the first search to the final
              admission, handled by one team.
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
            {/* Button text/href screenshot jaisa rakha hai, chaaho to "View All Services" kar do */}
            <Link
              href="/case-studies"
              className="group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full bg-white pl-5 pr-2 text-[16px] font-medium text-black shadow-[-4px_4px_14px_0px_#0000001F,-17px_17px_25px_0px_#0000001A,-39px_39px_33px_0px_#0000000F,-70px_70px_39px_0px_#00000005,-109px_109px_43px_0px_#00000000] transition-colors duration-500 hover:text-white sm:h-14 sm:pl-6"
            >
              <span
                aria-hidden="true"
                className="absolute right-2 top-1/2 size-9 -translate-y-1/2 rounded-full bg-[#0954FD] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[14] sm:size-10"
              />
              <span className="relative z-10">View All Case Studies</span>
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
      </div>

      {/* ============ Rows (full-width, taaki hover bg poori width me aaye) ============ */}
      <div className="mt-8 border-t border-black/[0.06] sm:mt-10 lg:mt-12">
        {SERVICES.map((item, i) => (
          <ServiceRow
            key={item.id}
            item={item}
            index={i}
            open={openId === item.id}
            onOpen={handleOpen}
            onClose={handleClose}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </section>
  );
}
