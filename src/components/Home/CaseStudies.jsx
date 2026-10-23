'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */
const EASE = [0.22, 1, 0.36, 1];
const AUTO_CHANGE_MS = 10000; // 10 sec

// Images (apne folder ke hisaab se path badal lo)
const ACTIVE_TAB_BG = 'images/home/active-tab-bg-img.svg';
const CARD_HOVER_BG = 'images/home/case-study-bg-img.svg';

const TABS = [
  { id: 'all', label: 'All Case Studies', category: null },
  { id: 'universities', label: 'Universities', category: 'University' },
  { id: 'colleges', label: 'Colleges & B-Schools', category: 'College' },
  { id: 'schools', label: 'Schools', category: 'School' },
  { id: 'skill', label: 'Skill & Career Institutes', category: 'Skill Institute' },
];

const CASES = [
  {
    id: 'sgvu',
    category: 'University',
    name: 'Suresh Gyan Vihar University',
    logo: 'images/home/sgvu-logo.webp',
    desc: 'A Jaipur university that partnered with Mediagarh for a full 360° digital overhaul, from brand identity to performance campaigns.',
    tags: ['SEO', 'Meta & Google Ads', 'Landing Pages', 'Branding', 'Videos'],
    stat: '2000+',
    statLabel: 'Admissions Closed',
    quote:
      'SGVU needed admissions at scale in a highly competitive market, but weak Google visibility and low brand awareness were holding growth back.',
    person: 'Sunil Sharma',
    role: 'Co-Founder & CEO',
    avatar: 'images/home/client-img-1.webp',
    href: '/case-studies/suresh-gyan-vihar-university',
  },
  {
    id: 'cimage',
    category: 'College',
    name: 'Cimage Group of Institutions',
    logo: 'images/home/cimage-logo.webp',
    desc: "A premier college group in Patna and the organiser of Career Mahakumbh, Bihar's biggest student event.",
    tags: ['Landing Pages', 'SEO', 'Event Marketing', 'Meta & Google Ads'],
    stat: '1100+',
    statLabel: 'Admissions Closed',
    quote:
      'CIMAGE needed large-scale admissions and visibility, while also turning Career Mahakumbh, Bihar’s biggest student event, into an admissions driver.',
    person: 'Dr. Neeraj Agarwal',
    role: 'Director',
    avatar: 'images/home/client-img-2.webp',
    href: '/case-studies/cimage-group-of-institutions',
  },
  {
    id: 'isd',
    category: 'Skill Institute',
    name: 'International School of Design',
    logo: 'images/home/insd-logo.webp',
    desc: 'International School of Design, a design-education network growing its franchise centers and student enrollments.',
    tags: ['Paid Ads', 'Creatives', 'Lead Nurturing', 'Webinar Funnel'],
    stat: '25X',
    statLabel: 'Return on ad spend',
    quote:
      'INSD needed to grow its franchise network in a competitive design-education market, while fixing a weak admission funnel and a high cost per lead.',
    person: 'Sunjey Agarwal',
    role: 'Founder & Director',
    avatar: 'images/home/client-img-3.webp',
    href: '/case-studies/international-school-of-design',
  },
  {
    id: 'izee',
    category: 'College',
    name: 'IZee Business School',
    logo: 'images/home/izee-logo.webp',
    desc: "Recognised among Karnataka's top B-schools for its industry-aligned MBA programs and experienced faculty.",
    tags: ['Branding', 'Social Media', 'Lead Gen', 'SEO', 'Website Development'],
    stat: '₹6.4Cr',
    statLabel: 'Admissions Value',
    quote:
      'IZee needed sharper brand positioning to stand out among Bangalore’s B-schools, attract attention and increase MBA enrollments.',
    person: 'Dr. Zaheesh Moldeen',
    role: 'Chairman & Founder',
    avatar: 'images/home/client-img-4.webp',
    href: '/case-studies/izee-business-school',
  },
  {
    id: 'rishihood',
    category: 'University',
    name: 'Rishihood University',
    logo: 'images/home/rishihood-logo.webp',
    desc: 'A private university in Haryana that partnered with Mediagarh to make the most of its 2025 admission season.',
    tags: ['PPC', 'Ad Creatives', 'Lead Nurturing', 'Video Ads'],
    stat: '240+',
    statLabel: 'Admissions Closed',
    quote:
      'Rishihood wanted to make the most of its 2025 admission season: more enrollments, better return on ad spend and a lower cost per lead.',
    person: 'Sahil Aggarwal',
    role: 'Co-Founder & CEO',
    avatar: 'images/home/client-img-6.webp',
    href: '/case-studies/rishihood-university',
  },
  {
    id: 'worldview',
    category: 'School',
    name: 'Worldview Academy',
    logo: 'images/home/worldview-academy-logo.webp',
    desc: 'A school that partnered with Mediagarh to shape its identity and build one cohesive brand story across platforms.',
    tags: ['Branding', 'Social Media', 'Paid Ads', 'Website Development'],
    stat: '500+',
    statLabel: 'Seats filled in 75 days',
    quote:
      'Worldview lacked a clear identity and needed a stronger online presence, more engagement and more admissions.',
    person: 'Navneet Singh',
    role: 'Chairman',
    avatar: 'images/home/client-img-5.webp',
    href: '/case-studies/worldview-academy',
  },
  {
    id: 'bodhi',
    category: 'School',
    name: 'Bodhi International School',
    logo: 'images/home/bodhi-school-logo.webp',
    desc: 'A K-12 school that partnered with Mediagarh for two straight admission seasons to reposition its brand.',
    tags: ['Social Media', 'SEO', 'Lead Gen', 'Video Ads'],
    stat: '₹2 Cr+',
    statLabel: 'Revenue in 2 years',
    quote:
      'A school with a strong reputation, missing the spotlight. Events created no buzz, the website didn’t rank, and admissions weren’t scaling.',
    person: 'Namit Bhandari',
    role: 'Director',
    avatar: 'images/home/client-img-7.webp',
    href: '/case-studies/bodhi-international-school',
  },
  {
    id: 'fintelligents',
    category: 'Skill Institute',
    name: 'Fintelligents',
    logo: 'images/home/fintelligents-logo.webp',
    desc: 'Specialised CFA, FRM and finance-upskilling programs for serious aspirants across India and abroad.',
    tags: ['Landing Pages', 'Performance Ads', 'Content', 'Video Ads'],
    stat: '13X',
    statLabel: 'Increase in ROAS',
    quote:
      'Fintelligents wanted to be the go-to name for serious finance learners, but weak content and unoptimised campaigns were limiting inquiries.',
    person: 'Krupa Shukla',
    role: 'Co-Founder',
    avatar: 'images/home/client-img-9.webp',
    href: '/case-studies/fintelligents',
  },
  {
    id: 'tonsbridge',
    category: 'School',
    name: 'The TonsBridge School',
    logo: 'images/home/the-tonsbridge-logo.webp',
    desc: 'A Dehradun day-boarding school known for its 1:15 teacher-student ratio and strong sports culture.',
    tags: ['Branding', 'Lead Gen', 'Social Media', 'Retargeting'],
    stat: '15X',
    statLabel: 'ROAS on Admission Ads',
    quote:
      'In Dehradun’s crowded school market, TonsBridge needed to go beyond traditional ads and show off its 1:15 ratio and 18-acre campus online.',
    person: 'Vijay Nagar',
    role: 'Chairman',
    avatar: 'images/home/client-img-8.webp',
    href: '/case-studies/the-tonsbridge-school',
  },
];

const headFade = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.1 },
  }),
};

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */
function CaseCard({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      variants={cardVariants}
      tabIndex={0}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setOpen(false)}
      // touch devices par tap se toggle
      onPointerDown={(e) => e.pointerType !== 'mouse' && setOpen((o) => !o)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      className="relative flex min-h-[300px] min-w-0 flex-col justify-between overflow-hidden rounded-[8px] bg-white p-5 outline-none focus-visible:ring-2 focus-visible:ring-[#0954FD] xl:p-[24px]"
    >
      {/* ---------- FRONT ---------- */}
      <div>
        <div className="flex items-center justify-between gap-3">
          <Image
            src={process.env.IMG_PATH + item.logo}
            alt={`${item.name} logo`}
            width={160}
            height={44}
            className="h-9 w-auto max-w-[60%] object-contain object-left"
          />
          <span className="shrink-0 rounded-full bg-[#1A76FF0D] px-3 py-1.5 text-[12px] font-semibold leading-none text-black">
            {item.category}
          </span>
        </div>

        <h3 className="mt-[28px] text-[24px] font-semibold leading-snug text-black">{item.name}</h3>
        <p className="mt-[14px] text-[16px] leading-[1.75] text-black">{item.desc}</p>
      </div>
      <div className="mt-[28px] flex flex-wrap gap-2 border-t border-black/10 pt-[28px]">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-[#0000000D] px-2.5 py-1.5 text-[12px] font-medium leading-none text-black"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* ---------- BACK (hover) ---------- */}
      <motion.div
        aria-hidden={!open}
        initial={false}
        animate={{ clipPath: open ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }}
        transition={{ duration: 0.55, ease: EASE }}
        className={`absolute inset-0 flex flex-col justify-end overflow-hidden rounded-[inherit] bg-black p-5 text-white xl:p-6 ${
          open ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        style={{
          backgroundImage: `url(${process.env.IMG_PATH + CARD_HOVER_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <motion.div
          initial={false}
          animate={{ opacity: open ? 1 : 0, y: open ? 0 : 18 }}
          transition={{ duration: 0.5, ease: EASE, delay: open ? 0.15 : 0 }}
        >
          <p className="font-clash text-[32px] font-semibold leading-none xl:text-[36px]">{item.stat}</p>
          <p className="mt-[4px] text-[14px] font-semibold">{item.statLabel}</p>
          <p className="mt-[36px] text-[16px] leading-[1.8] text-white/85 xl:text-base xl:leading-8">{item.quote}</p>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: open ? 1 : 0, y: open ? 0 : 18 }}
          transition={{ duration: 0.5, ease: EASE, delay: open ? 0.25 : 0 }}
          className="mt-[40px] flex items-center justify-between gap-3"
        >
          <div className="flex min-w-0 items-center gap-3">
            <Image
              src={process.env.IMG_PATH + item.avatar}
              alt={item.person}
              width={44}
              height={44}
              className="size-11 shrink-0 rounded-full border-2 border-white object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold">{item.person}</p>
              <p className="truncate text-[12px] text-white/70 sm:text-sm">{item.role}</p>
            </div>
          </div>

          <Link
            href={item.href}
            tabIndex={open ? 0 : -1}
            aria-label={`Read ${item.name} case study`}
            className="group flex size-10 shrink-0 items-center justify-center rounded-full bg-[#FFFFFF80] text-white transition-colors duration-300 hover:bg-white hover:text-black"
          >
            <ArrowUpRight
              size={18}
              strokeWidth={2.2}
              className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-[20deg]"
            />
          </Link>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function CaseStudies() {
  const sectionRef = useRef(null);
  const tabListRef = useRef(null);
  const tabRefs = useRef([]);

  const inView = useInView(sectionRef, { amount: 0.2 });
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0); // click par timer reset karne ke liye
  const [paused, setPaused] = useState(false); // card hover par autoplay pause

  const activeTab = TABS[active];
  const items = activeTab.category ? CASES.filter((c) => c.category === activeTab.category) : CASES;

  // Har 10 sec me next tab (section viewport me ho aur hover na ho tab hi)
  useEffect(() => {
    if (!inView || paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % TABS.length), AUTO_CHANGE_MS);
    return () => clearTimeout(t);
  }, [active, cycle, inView, paused]);

  // Mobile par horizontal tab list me active tab ko center me laao (page scroll nahi hoga)
  useEffect(() => {
    const list = tabListRef.current;
    const el = tabRefs.current[active];
    if (!list || !el || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({
      left: el.offsetLeft - list.clientWidth / 2 + el.clientWidth / 2,
      behavior: 'smooth',
    });
  }, [active]);

  const handleTab = (i) => {
    setActive(i);
    setCycle((c) => c + 1);
  };

  return (
    <section ref={sectionRef} className="bg-[#F5F5F5] py-[44px] sm:py-[64px] lg:py-[80px]">
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
              Trusted by{' '}
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
                150+ institutes
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
              From visibility to enrolments, we help education brands turn digital presence into measurable growth.
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
              href="/case-studies"
              className="group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full bg-white pl-5 pr-2 text-[16px] font-medium text-black shadow-[-4px_4px_14px_0px_#0000001F,-17px_17px_25px_0px_#0000001A,-39px_39px_33px_0px_#0000000F,-70px_70px_39px_0px_#00000005,-109px_109px_43px_0px_#00000000] transition-colors duration-500 hover:text-white sm:h-14 sm:pl-6"
            >
              {/* blue fill: arrow circle se expand hokar poore button ko bharta hai */}
              <span
                aria-hidden="true"
                className="absolute right-2 top-1/2 size-9 -translate-y-1/2 rounded-full bg-[#0954FD] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[14] sm:size-10"
              />

              <span className="relative z-10">View All Case Studies</span>

              {/* arrow circle (blue fill ke upar) */}
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

        {/* ============ Tabs + Cards ============ */}
        {/* grid-cols-[minmax(0,1fr)]: mobile par column content ki wajah se phoolta nahi */}
        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-5 sm:mt-10 lg:mt-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-[48px] xl:grid-cols-[300px_minmax(0,1fr)]">
          {/* ---------- Left: sticky tabs ---------- */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="min-w-0 lg:sticky lg:top-28 lg:self-start"
          >
            <div
              ref={tabListRef}
              role="tablist"
              aria-label="Case study categories"
              className="relative -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-[10px] lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
            >
              {TABS.map((tab, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => (tabRefs.current[i] = el)}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleTab(i)}
                    className={`relative h-11 shrink-0 whitespace-nowrap rounded-md bg-white px-4 text-left text-[16px] font-semibold transition-colors duration-300 sm:h-[54px] lg:w-full ${
                      isActive ? 'text-white' : 'text-black hover:bg-white/70'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="case-tab-active"
                        transition={{ duration: 0.5, ease: EASE }}
                        className="absolute inset-0 z-0 rounded-md bg-black"
                        style={{
                          backgroundImage: `url(${process.env.IMG_PATH + ACTIVE_TAB_BG})`,
                          backgroundSize: '100% auto',
                          backgroundPosition: 'bottom',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* ---------- Right: cards ---------- */}
          <div
            className="min-w-0"
            onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
            onPointerLeave={(e) => e.pointerType === 'mouse' && setPaused(false)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTab.id}
                role="tabpanel"
                variants={gridVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="grid grid-cols-[minmax(0,1fr)] gap-[20px] sm:grid-cols-2 xl:grid-cols-3"
              >
                {items.map((item) => (
                  <CaseCard key={item.id} item={item} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
