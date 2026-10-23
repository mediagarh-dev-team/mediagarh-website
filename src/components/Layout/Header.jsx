'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, Video, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'We Serve', href: '/we-serve' },
  { label: 'Our Work', href: '/our-work' },
  { label: 'Blog', href: '/blog' },
];

const EASE = [0.22, 1, 0.36, 1];

function Logo() {
  return (
    <Link href="/" aria-label="Mediagarh home" className="block shrink-0">
      {/* logo file ka naam change karna ho to yahan src badlo */}
      <Image
        src="/images/logo.svg"
        alt="Mediagarh"
        width={154}
        height={30}
        priority
        unoptimized
        className="h-auto w-[120px] sm:w-[140px] min-[1400px]:w-[154px]"
      />
    </Link>
  );
}

function ConnectButton({ className = '' }) {
  return (
    <Link
      href="/contact"
      className={`inline-flex h-[46px] items-center justify-center gap-2 rounded-[4px] border-[#FFFFFF40] bg-[#0954FD] px-5 text-[14px] font-medium text-white transition-all duration-300 hover:brightness-110 ${className}`}
    >
      Let&apos;s Connect
      <Video size={16} strokeWidth={2.2} />
    </Link>
  );
}

function NewsletterButton({ className = '' }) {
  return (
    <Link
      href="/newsletter"
      className={`inline-flex h-[46px] items-center justify-center gap-2 rounded-[4px] border border-white/60 px-4 text-[14px] font-medium text-white transition-all duration-300 hover:border-white hover:bg-white/10 ${className}`}
    >
      Get the Newsletter
      <Download size={14} strokeWidth={2.2} />
    </Link>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          aria-label="Open menu"
          className="flex size-11 items-center justify-center rounded-md border border-white/30 text-white lg:hidden"
        >
          <Menu size={22} />
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.aside
                className="fixed right-0 top-0 z-[70] flex h-full w-[86%] max-w-sm flex-col bg-black px-6 pb-8 pt-5 shadow-[-20px_0_60px_rgba(9,84,253,0.25)]"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <Dialog.Title className="sr-only">Navigation menu</Dialog.Title>

                <div className="flex items-center justify-between">
                  <Logo />
                  <Dialog.Close asChild>
                    <button
                      aria-label="Close menu"
                      className="flex size-11 items-center justify-center rounded-md border border-white/30 text-white"
                    >
                      <X size={22} />
                    </button>
                  </Dialog.Close>
                </div>

                <nav className="mt-10 flex flex-col">
                  {NAV_LINKS.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12 + i * 0.06, duration: 0.5, ease: EASE }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="font-clash block border-b border-white/10 py-4 text-2xl font-medium text-white"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-auto flex flex-col gap-3">
                  <ConnectButton className="w-full" />
                  <NewsletterButton className="w-full" />
                </div>
              </motion.aside>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

export default function Header() {
  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="sticky top-0 z-50 h-[72px] bg-black lg:h-[90px]"
    >
      {/* 1400px container (1920 screen tak), 2200px+ pe wide (image 1) */}
      <div className="mx-auto flex h-full custom-container items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] min-[1400px]:px-0 min-[2200px]:max-w-[2050px]">
        <Logo />

        <nav className="hidden items-center gap-10 lg:flex xl:gap-20">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="group relative text-base text-white">
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center justify-end gap-2.5 lg:flex">
          <ConnectButton />
          <NewsletterButton />
        </div>

        <MobileMenu />
      </div>
    </motion.header>
  );
}
