'use client';
import { useId } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

const FOOTER_BG = 'images/home/footer-bg.svg';
const PANKAJ_IMG = 'images/home/pankaj-sir.webp';
// "#1" ke peeche wali bg image (tum manually add karoge, path apne hisaab se badal lo)
const BADGE_BG = 'images/home/rank-badge-bg.svg';

const EMAIL = 'pankaj@mediagarh.com';
const PHONE = '+91 93588 34407';

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

/* ------------------------------------------------------------------ */
/* Brand icons (lucide-react ke naye versions me brand icons nahi hain) */
/* ------------------------------------------------------------------ */
function BrandIcon({ size = 16, strokeWidth = 2, children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <BrandIcon {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </BrandIcon>
  );
}

function InstagramIcon(props) {
  return (
    <BrandIcon {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </BrandIcon>
  );
}

function FacebookIcon(props) {
  return (
    <BrandIcon {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </BrandIcon>
  );
}

function YoutubeIcon(props) {
  return (
    <BrandIcon {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </BrandIcon>
  );
}

const LINK_COLUMNS = [
  {
    title: 'Services',
    links: [
      'Search Engine Optimization',
      'Social Media Advertising',
      'Google Ads',
      'Web Design & Development',
      'Landing Page Services',
      'Video Ad Production',
      'Creative Designing',
      'Lead Automation & Nurturing',
      'PR Activities',
    ].map((label) => ({ label, href: `/services/${slug(label)}` })),
  },
  {
    title: 'We Serve',
    links: [
      { label: 'Colleges', href: '/colleges' },
      { label: 'Schools', href: '/schools' },
    ],
  },
  {
    title: 'Our Work',
    links: [
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Client Testimonials', href: '/testimonials' },
      { label: 'Our Gallery', href: '/gallery' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about-us' },
      { label: 'Career', href: '/career' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
];

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', Icon: LinkedinIcon, bg: '#0A66C2' },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/',
    Icon: InstagramIcon,
    bg: 'linear-gradient(45deg, #FEDA75 0%, #FA7E1E 25%, #D62976 50%, #962FBF 75%, #4F5BD5 100%)',
  },
  { label: 'Facebook', href: 'https://www.facebook.com/', Icon: FacebookIcon, bg: '#1877F2' },
  { label: 'YouTube', href: 'https://www.youtube.com/', Icon: YoutubeIcon, bg: '#FF0000' },
];

const OFFICES = [
  {
    city: 'Jodhpur',
    hq: true,
    address: '1A2, PW Rd, near Amargarh Resort, Ravi Nagar, Jodhpur, Rajasthan 342001',
  },
  {
    city: 'Jaipur',
    address: 'Office No. 711, 7th Floor, Evershine Tower, Amrapali Circle, Vaishali Nagar, Jaipur 302021',
  },
  {
    city: 'Bengaluru',
    address: '5th Floor, 365 Office Space, 22nd Cross Rd, Sector 2, HSR Layout, Bengaluru 560102',
  },
];

/* ------------------------------------------------------------------ */
/* Motion variants                                                     */
/* ------------------------------------------------------------------ */
const stagger = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const lineReveal = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.9, ease: EASE } },
};
const letterRise = {
  hidden: { opacity: 0, y: '40%' },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
};

const vp = { once: true, amount: 0.25 };

/* ------------------------------------------------------------------ */
/* #1 Badge                                                            */
/* Sirf bahar wala circle (white ring + circular text) rotate hota hai. */
/* "#1" aur uske peeche ki bg image static rehti hai.                  */
/* ------------------------------------------------------------------ */
function RankBadge() {
  const gid = useId().replace(/:/g, '');
  const ringText = 'INDIA’S NO.1 EDTECH AGENCY • INDIA’S NO.1 EDTECH AGENCY • ';

  return (
    // flex + justify-center: badge footer ke horizontal center me
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: 'spring', stiffness: 160, damping: 16 }}
      className="flex justify-center"
    >
      <div className="relative size-[160px] sm:size-[200px] lg:size-[257px]">
        {/* Glow: heavy box-shadow ki jagah halka radial gradient (GPU par sasta) */}
        <div aria-hidden="true" className="pointer-events-none absolute -inset-[40%] rounded-full" />

        {/* Rotating ring: CSS animation (compositor par chalti hai, JS ka load nahi) */}
        <svg
          viewBox="0 0 200 200"
          className="footer-ring absolute inset-0 size-full"
          style={{ animation: 'footer-ring-rotate 28s linear infinite', willChange: 'transform' }}
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="99" fill="#fff" />
          <defs>
            <path id={`${gid}-ring`} d="M100,100 m-73,0 a73,73 0 1,1 146,0 a73,73 0 1,1 -146,0" />
          </defs>
          <text fill="#1B2A6B" fontSize="14.5" fontWeight="600" letterSpacing="1.2">
            <textPath href={`#${gid}-ring`} textLength="455" lengthAdjust="spacing">
              {ringText}
            </textPath>
          </text>
        </svg>

        {/* Static center: bg image + #1 (rotate nahi hota) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex size-[46%] items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={process.env.IMG_PATH + 'images/home/scallop.svg'}
              alt=""
              draggable={false}
              className="absolute inset-0 size-full select-none object-contain"
            />
            <span className="relative z-10 text-[24px] font-bold leading-none text-white sm:text-[30px] lg:text-[52px]">
              #1
            </span>
          </div>
        </div>

        <span className="sr-only">India’s No.1 Edtech Agency</span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Underline stroke: fill hoti hai, phir unfill, loop                  */
/* ------------------------------------------------------------------ */
function AnimatedUnderline() {
  const gid = useId().replace(/:/g, '');
  const d =
    'M1.09998 2.94355C26.1 2.54355 56.1 1.64355 79.1 1.14355L75.6 6.94355C93.0999 6.34356 111.1 5.64356 129.1 4.94356L129.1 4.94355';

  return (
    <svg
      viewBox="0 0 131 9"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-[7px] left-0 h-auto w-full overflow-visible"
    >
      <defs>
        <linearGradient id={gid} x1="1.09998" y1="4.04355" x2="129.1" y2="4.04355" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8FA3FF" stopOpacity="0.15" />
          <stop offset="0.35" stopColor="#8FA3FF" stopOpacity="0.85" />
          <stop offset="1" stopColor="#8FA3FF" />
        </linearGradient>
      </defs>

      {/* Track (unfilled state) */}
      <path d={d} stroke="rgba(143, 163, 255, 0.15)" strokeWidth="2.2" strokeLinecap="round" />

      {/* Fill -> hold -> unfill, loop (CSS animation, JS/framer ka load nahi) */}
      <path
        d={d}
        pathLength="1"
        stroke={`url(#${gid})`}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="1 1"
        className="footer-underline"
        style={{ strokeDashoffset: 1.05, animation: 'footer-underline 4s ease-in-out infinite' }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */
export default function Footer() {
  const letters = 'Mediagarh'.split('');

  return (
    <footer className="relative isolate overflow-hidden bg-black text-white">
      {/* Keyframes (CSS animations => smooth, main thread free) */}
      <style>{`
        @keyframes footer-ring-rotate { to { transform: rotate(360deg); } }
        @keyframes footer-underline {
          0% { stroke-dashoffset: 1.05; }
          45%, 65% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 1.05; }
        }
        @media (prefers-reduced-motion: reduce) {
          .footer-ring, .footer-underline { animation: none !important; }
        }
      `}</style>

      {/* Single bg image: alag GPU layer me, ek baar raster hokar cache hoti hai */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={process.env.IMG_PATH + FOOTER_BG}
        alt=""
        aria-hidden="true"
        decoding="async"
        draggable={false}
        className="pointer-events-none absolute inset-0 -z-10 size-full select-none object-cover object-center"
        style={{ transform: 'translateZ(0)' }}
      />

      {/* ================= CTA ================= */}
      <div className="custom-container relative z-10 pb-[90px] pt-[36px] text-center sm:pb-[130px] lg:pb-[200px] lg:pt-[44px]">
        <RankBadge />

        <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={vp}>
          <h2 className="font-clash mx-auto mt-8 max-w-[760px] text-[28px] font-medium leading-[1.25] sm:mt-10 sm:text-[44px] lg:mt-14 lg:text-[64px]">
            <span className="block overflow-hidden py-[0.06em]">
              <motion.span variants={lineReveal} className="block">
                Ready to fill every seat
              </motion.span>
            </span>
            <span className="block overflow-hidden py-[0.06em]">
              <motion.span variants={lineReveal} className="block">
                this admission season?
              </motion.span>
            </span>
          </h2>

          <motion.div variants={fadeUp} className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:mt-9">
            <Link
              href="/contact"
              className="group inline-flex h-[48px] items-center gap-3 rounded-[8px] bg-white pl-5 pr-1.5 text-[15px] font-medium text-black transition-transform duration-300 hover:-translate-y-0.5 sm:h-[68px] sm:text-[20px]"
            >
              Book a consultation
              <span className="flex size-9 items-center justify-center rounded-[6px] bg-[#2F4BFF] text-white sm:size-[52px]">
                <ArrowRight
                  size={22}
                  strokeWidth={2.4}
                  className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-[20deg]"
                />
              </span>
            </Link>

            <Link
              href="/case-studies"
              className="inline-flex h-[48px] items-center rounded-[8px] border border-[#8CA1FF80] px-6 text-[15px] font-medium text-white transition duration-300 hover:-translate-y-0.5 sm:h-[68px] sm:px-7 sm:text-[20px]"
              style={{ backgroundImage: 'linear-gradient(180deg, #2F4BFF 0%, #2236C9 100%)' }}
            >
              Case studies
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* ================= Links ================= */}
      <div className="custom-container-2 relative z-10">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-[2fr_1.3fr_0.9fr_1fr_0.9fr] lg:gap-x-8"
        >
          {/* Brand */}
          <motion.div variants={fadeUp} className="col-span-2 sm:col-span-4 lg:col-span-1">
            <p className="text-[26px] font-semibold leading-none sm:text-[34px]">Mediagarh</p>
            <p className="mt-4 max-w-[420px] text-[13px] leading-[1.7] text-[#A6ABC7] sm:text-[17px]">
              Education marketing agency helping schools, colleges and universities fill seats and build trusted brands.
            </p>

            <p className="mt-5 text-[13px] font-semibold sm:text-[17px]">Subscribe to our newsletter</p>
            <form onSubmit={(e) => e.preventDefault()} className="relative mt-3 max-w-[420px]">
              <label htmlFor="footer-email" className="sr-only">
                Your email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="Your email address"
                className="h-[62px] w-full rounded-[8px] border border-white/10 bg-white/[0.06] pl-4 pr-14 text-[13px] text-white outline-none transition-colors placeholder:text-white/40 focus:border-[#8FA3FF]/60"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="group absolute right-1.5 top-1/2 flex size-[46px] -translate-y-1/2 items-center justify-center rounded-[6px] bg-white text-black transition-transform duration-300 hover:scale-105"
              >
                <ArrowRight
                  size={22}
                  strokeWidth={2.4}
                  className="transition-transform duration-500 group-hover:-rotate-[20deg]"
                />
              </button>
            </form>

            <div className="mt-5 flex items-center gap-2.5">
              {SOCIALS.map(({ label, href, Icon, bg }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -4, scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex size-[56px] items-center justify-center rounded-[6px] text-white"
                  style={{ background: bg }}
                >
                  <Icon size={22} strokeWidth={2.2} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {LINK_COLUMNS.map((col, i) => (
            <motion.div key={col.title} variants={fadeUp} className={i === 0 ? 'col-span-2 sm:col-span-1' : undefined}>
              <h3 className="text-[14px] font-medium uppercase tracking-[0.14em] text-[#8FA3FF]">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-block text-[19px] leading-snug text-white/90 transition duration-300 hover:translate-x-1 hover:text-[#8FA3FF]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* ================= Offices ================= */}
        <div className="mt-12 border-t border-white/10 pt-8 lg:mt-16 lg:pt-9">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            className="flex flex-wrap items-center justify-between gap-2"
          >
            <p className="text-[14px] font-medium uppercase tracking-[0.14em] text-[#8FA3FF]">Our Offices</p>
            <p className="text-[14px] text-white/60">Also in Kolkata · Gurugram · Chennai</p>
          </motion.div>

          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4"
          >
            {OFFICES.map((o) => (
              <motion.div
                key={o.city}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="rounded-[18px] border border-white/10 bg-white/[0.06] p-[24px]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-[44px] items-center justify-center rounded-[6px] bg-white/10 text-white/80">
                    <MapPin size={22} strokeWidth={2} />
                  </span>
                  <span className="text-[21px] font-semibold">{o.city}</span>
                  {o.hq && (
                    <span className="rounded-[9999px] border border-white/25 px-[10px] py-[4px] text-[12px] font-semibold leading-none tracking-wide text-white/80">
                      HQ
                    </span>
                  )}
                </div>
                <p className="mt-4 text-[12px] leading-[1.7] text-white/60 sm:text-[16px]">{o.address}</p>
              </motion.div>
            ))}

            {/* Send a message box */}
            <motion.a
              variants={fadeUp}
              href={`mailto:${EMAIL}`}
              whileHover={{ y: -4 }}
              className="group relative block rounded-[18px] p-[24px] sm:col-span-2 lg:col-span-1"
              style={{
                background: 'linear-gradient(135deg, #2F4BFF 14.29%, #7A5CFF 85.71%)',
                boxShadow: '0 16px 40px 0 rgba(46, 74, 255, 0.35)',
              }}
            >
              <div className="flex items-start justify-between">
                <span className="text-[18px] text-white/90">Send a message</span>
                <span className="flex size-[44px] items-center justify-center rounded-full bg-white text-[#2F4BFF]">
                  <ArrowUpRight
                    size={22}
                    strokeWidth={2.4}
                    className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[45deg]"
                  />
                </span>
              </div>
              <p className="mt-3 break-all text-[20px] font-semibold leading-tight sm:text-[28px]">{EMAIL}</p>
              <p className="mt-2 text-[17px] text-white/70">{PHONE}</p>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* ================= Giant wordmark + pill ================= */}
      <div className="custom-container-2 relative z-10 mt-[60px] sm:mt-[80px] lg:mt-[110px]">
        <div className="relative">
          <motion.h2
            variants={stagger(0.05)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            aria-label="Mediagarh"
            className="font-clash select-none overflow-hidden whitespace-nowrap text-center text-[clamp(52px,15.6vw,290px)] font-semibold leading-[1.1] tracking-[-0.02em] text-white/10"
          >
            {letters.map((ch, i) => (
              <motion.span key={i} variants={letterRise} aria-hidden="true" className="inline-block">
                {ch}
              </motion.span>
            ))}
          </motion.h2>

          {/* Pill: md+ par text ke upar center me, mobile par neeche */}
          <div className="mt-6 flex justify-center md:absolute md:inset-0 md:mt-0 md:items-center">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
              className="flex max-w-full flex-col items-center gap-3 rounded-[12px] border border-white/10 bg-[#0B1226]/90 px-4 py-3 text-center sm:flex-row sm:gap-4 sm:py-2.5 sm:pl-3 sm:pr-2.5 sm:text-left md:whitespace-nowrap"
            >
              <span className="flex items-center gap-3">
                <span className="size-8 shrink-0 overflow-hidden rounded-full bg-[#1A76FF] sm:size-[52px]">
                  <Image
                    src={process.env.IMG_PATH + PANKAJ_IMG}
                    alt="Pankaj, Mediagarh"
                    title="Pankaj, Mediagarh"
                    width={72}
                    height={72}
                    className="size-full object-cover"
                  />
                </span>
                <span className="text-[13px] leading-snug text-white/85 sm:text-[20px]">
                  See how Mediagarh can{' '}
                  <span className="relative inline-block font-medium text-[#8FA3FF]">
                    fill your seats
                    <AnimatedUnderline />
                  </span>{' '}
                  in a 30-minute call
                </span>
              </span>

              <Link
                href="/contact"
                className="inline-flex h-[48px] shrink-0 items-center rounded-[6px] bg-white px-4 text-[18px] font-semibold text-black transition-transform duration-300 hover:scale-105"
              >
                Book a call
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ================= Bottom bar ================= */}
      <div className="custom-container-2 relative z-10 pb-6 pt-8 sm:pt-10 lg:pt-12">
        <div className="flex flex-col items-center justify-between gap-3 text-[14px] text-white/70 sm:flex-row sm:text-[18px]">
          <p>© Mediagarh {new Date().getFullYear()}. All Rights Reserved</p>
          <div className="flex items-center gap-4">
            <Link href="/terms-and-conditions" className="transition-colors hover:text-white">
              Terms &amp; Conditions
            </Link>
            <span aria-hidden="true" className="h-3 w-px bg-white/30" />
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
