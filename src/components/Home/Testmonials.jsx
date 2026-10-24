import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];
const MARQUEE_SPEED = 40;

const ROW_1 = [
  {
    id: 'r1-rishihood',
    type: 'quote',
    logo: 'images/home/rishihoad-logo.webp',
    quote: 'It was **with their support that we closed a very successful admission season.**', // TODO: real quote
    name: 'Sahil Aggarwal',
    role: 'Co-Founder & CEO',
    avatar: 'images/home/client-img-6.webp',
  },
  {
    id: 'r1-shobhit',
    type: 'video',
    poster: 'images/home/video-thubnail-1.webp', // TODO
    video: 'videos/home/testimonial-1.mp4', // TODO
    caption: 'Digital marketing empowers youth for a better future.',
  },
  {
    id: 'r1-insd',
    type: 'quote',
    logo: 'images/home/insd-logo.webp',
    quote:
      'Honesty, transparency, and credibility are the reasons we’ve **maintained our partnership for over 2.5 years.**',
    name: 'Sunjey Agarwal',
    role: 'Founder & Director',
    avatar: 'images/home/client-img-3.webp',
  },
  {
    id: 'r1-svu',
    type: 'quote',
    logo: 'images/home/svu-logo.webp', // TODO
    quote: 'With over 13 years in the industry, this has been **my best experience with an agency.**',
    name: 'Tarun Kamboj',
    role: 'Director of Marketing',
    avatar: 'images/home/client-img-10.webp', // TODO
  },
  {
    id: 'r1-cpj',
    type: 'quote',
    logo: 'images/home/cpj-logo.webp', // TODO
    quote: 'From **page 7 to page 1** rankings and from low leads to steady admissions.',
    name: 'Abhishek Jain',
    role: 'Chairman',
    avatar: 'images/home/client-img-11.webp', // TODO
  },
  {
    id: 'r1-shobhit-2',
    type: 'video',
    poster: 'images/home/video-thubnail-2.webp', // TODO
    video: 'videos/home/testimonial-1.mp4', // TODO
    caption: 'Digital marketing empowers youth for a better future.',
  },
  {
    id: 'r1-exceeds',
    type: 'quote',
    logo: 'images/home/wna-logo.webp', // TODO
    quote: 'Mediagarh stands out with its work. The team is a delegation superhero.', // TODO: real quote
    name: 'Navneet Singh',
    role: 'Chairman',
    avatar: 'images/home/client-img-5.webp',
  },
];

const ROW_2 = [
  {
    id: 'r2-amc',
    type: 'video',
    poster: 'images/home/video-thumbnail-3.webp', // TODO
    video: 'videos/home/testimonial-2.mp4', // TODO
    caption: 'Mediagarh helped AMC boost admissions.', // TODO
  },
  {
    id: 'r2-cpj',
    type: 'quote',
    logo: 'images/home/cpj-logo.webp', // TODO
    quote: 'From **page 7 to page 1** rankings and from low leads to steady admissions.',
    name: 'Abhishek Jain',
    role: 'Chairman',
    avatar: 'images/home/client-img-11.webp', // TODO
  },
  {
    id: 'r2-bodhi',
    type: 'quote',
    tone: 'green',
    logo: 'images/home/bodhi-school-logo.webp',
    quote: 'With Mediagarh’s expertise, **our brand truly stood out** and our vision reached the right audience.',
    name: 'Namit Bhandari',
    role: 'Director',
    avatar: 'images/home/client-img-7.webp',
  },
  {
    id: 'r2-cloud',
    type: 'quote',
    logo: 'images/home/cloud-logo.webp', // TODO
    quote: 'From low visibility to **100+ admissions** in just 3 months, the results speak for themselves.',
    name: 'Sumit Mahakalkar',
    role: 'Founder',
    avatar: 'images/home/client-img-12.webp', // TODO
  },
  {
    id: 'r2-podcast',
    type: 'video',
    poster: 'images/home/video-thumbnail-4.webp', // TODO
    video: 'videos/home/testimonial-3.mp4', // TODO
    caption: 'They met our needs, delivered as promised, and earned trust.',
  },
  {
    id: 'r2-insd',
    type: 'quote',
    logo: 'images/home/insd-logo.webp',
    quote:
      'Honesty, transparency, and credibility are the reasons we’ve **maintained our partnership for over 2.5 years.**',
    name: 'Sunjey Agarwal',
    role: 'Founder & Director',
    avatar: 'images/home/client-img-3.webp',
  },
  {
    id: 'r2-svu',
    type: 'quote',
    logo: 'images/home/svu-logo.webp', // TODO
    quote: 'With over 13 years in the industry, this has been **my best experience with an agency.**',
    name: 'Tarun Kamboj',
    role: 'Director of Marketing',
    avatar: 'images/home/client-img-10.webp', // TODO
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

const rowReveal = {
  hidden: { opacity: 0, y: 50 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: 0.15 + i * 0.15 },
  }),
};

// Dono card types ki same size
const cardSize = 'h-[250px] sm:h-[280px] lg:h-[300px]';

/* ------------------------------------------------------------------ */
/* Quote card                                                          */
/* ------------------------------------------------------------------ */
function QuoteCard({ item }) {
  const isGreen = item.tone === 'green';
  const parts = item.quote.split('**');
  const mutedText = isGreen ? 'text-black/55' : 'text-black/45';

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={`flex w-[260px] shrink-0 flex-col justify-between rounded-[10px] border p-5 sm:w-[290px] lg:w-[300px] lg:p-6 ${cardSize} ${
        isGreen
          ? 'border-transparent bg-gradient-to-b from-[#FBFFC4] via-[#E6F9A8] to-[#BEF27F]'
          : 'border-black/[0.06] bg-[#F5F5F5]'
      }`}
    >
      <div>
        <Image
          src={process.env.IMG_PATH + item.logo}
          alt=""
          width={170}
          height={44}
          className="h-8 w-auto max-w-[75%] object-contain object-left lg:h-9"
        />

        <p className="mt-5 text-[14px] leading-[1.7] lg:mt-6 lg:text-[16px] lg:leading-[1.75]">
          <span className={mutedText}>“</span>
          {parts.map((part, i) =>
            i % 2 === 1 ? (
              <span key={i} className="text-black">
                {part}
              </span>
            ) : (
              <span key={i} className={mutedText}>
                {part}
              </span>
            ),
          )}
          <span className={mutedText}>”</span>
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Image
          src={process.env.IMG_PATH + item.avatar}
          alt={item.name}
          width={44}
          height={44}
          className="size-9 shrink-0 rounded-full object-cover lg:size-10"
        />
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold leading-tight text-black lg:text-[14px]">{item.name}</p>
          <p className="mt-0.5 truncate text-[11px] leading-tight text-black/70 lg:text-[12px]">{item.role}</p>
        </div>
      </div>
    </motion.article>
  );
}

function VideoCard({ item }) {
  const videoRef = useRef(null);
  const pointerType = useRef('mouse');
  const [playing, setPlaying] = useState(false);

  // Hover in: hamesha shuru se play
  const start = () => {
    const v = videoRef.current;
    setPlaying(true);
    if (!v) return;
    v.currentTime = 0;
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  };

  // Hover out: pause
  const stop = () => {
    setPlaying(false);
    videoRef.current?.pause();
  };

  return (
    <article
      onPointerDown={(e) => {
        pointerType.current = e.pointerType;
      }}
      onPointerEnter={(e) => e.pointerType === 'mouse' && start()}
      onPointerLeave={(e) => e.pointerType === 'mouse' && stop()}
      // touch par tap se play/pause
      onClick={() => pointerType.current !== 'mouse' && (playing ? stop() : start())}
      className={`relative w-[300px] shrink-0 cursor-pointer overflow-hidden rounded-[10px] bg-black sm:w-[380px] lg:w-[500px] ${cardSize}`}
    >
      <video
        ref={videoRef}
        src={process.env.IMG_PATH + item.video}
        poster={process.env.IMG_PATH + item.poster}
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        className="absolute inset-0 size-full object-cover"
      />

      {/* bottom gradient taaki caption padhi jaa sake */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

      <p className="pointer-events-none absolute bottom-4 left-4 right-16 text-[12px] leading-snug text-white sm:text-[13px] lg:bottom-5 lg:left-5 lg:text-[15px]">
        {item.caption}
      </p>

      {/* Play icon: hover par gayab */}
      <motion.span
        initial={false}
        animate={{ opacity: playing ? 0 : 1, scale: playing ? 0.6 : 1 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="pointer-events-none absolute bottom-4 right-4 flex size-8 items-center justify-center rounded-full bg-[#1A76FF] text-white sm:size-9 lg:bottom-5 lg:right-5"
        aria-hidden="true"
      >
        <Play size={13} strokeWidth={0} className="ml-0.5 fill-white" />
      </motion.span>
    </article>
  );
}

function MarqueeRow({ items, direction, order }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={rowReveal}
      custom={order}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      <Marquee
        direction={direction}
        speed={MARQUEE_SPEED}
        pauseOnHover
        autoFill
        play={!reduceMotion}
        // marquee ke aas-paas ka extra scroll/overflow na aaye
        className="overflow-hidden!"
      >
        {items.map((item) => (
          <div key={item.id} className="mr-4 lg:mr-5 pt-5">
            {item.type === 'video' ? <VideoCard item={item} /> : <QuoteCard item={item} />}
          </div>
        ))}
      </Marquee>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function Testimonials() {
  return (
    <section className="overflow-hidden bg-white py-[44px] sm:py-[64px] lg:py-[80px]">
      {/* ============ Header ============ */}
      <div className="custom-container">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[650px]">
            <motion.h2
              variants={headFade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="font-clash text-[28px] font-medium leading-[1.25] text-black sm:text-[32px] lg:text-[48px]"
            >
              Hear it from the institutions{' '}
              <span
                className="block bg-clip-text font-semibold text-transparent"
                style={{
                  backgroundImage: `url(${process.env.IMG_PATH}images/home/text-bg-grident-img.svg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  WebkitBackgroundClip: 'text',
                }}
              >
                we’ve helped grow
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
              Over 150 institutions, from K-12 to universities, trust Mediagarh for admissions.{' '}
              <br className="hidden lg:block" />
              Here’s what their leaders say.
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
              href="/stories"
              className="group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full bg-white pl-5 pr-2 text-[16px] font-medium text-black shadow-[-4px_4px_14px_0px_#0000001F,-17px_17px_25px_0px_#0000001A,-39px_39px_33px_0px_#0000000F,-70px_70px_39px_0px_#00000005,-109px_109px_43px_0px_#00000000] transition-colors duration-500 hover:text-white sm:h-14 sm:pl-6"
            >
              <span
                aria-hidden="true"
                className="absolute right-2 top-1/2 size-9 -translate-y-1/2 rounded-full bg-[#0954FD] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[14] sm:size-10"
              />
              <span className="relative z-10">Watch All Stories</span>
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

      {/* ============ Marquees (full-width) ============ */}
      <div className="relative mt-8 flex flex-col">
        {/* Row 1: right -> left */}
        <MarqueeRow items={ROW_1} direction="left" order={0} />
        {/* Row 2: left -> right */}
        <MarqueeRow items={ROW_2} direction="right" order={1} />

        {/* Left / right edge fade */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[60px] sm:w-[140px] lg:w-[220px]"
          style={{ background: 'linear-gradient(270deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%)' }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[60px] sm:w-[140px] lg:w-[220px]"
          style={{ background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%)' }}
        />
      </div>
    </section>
  );
}
