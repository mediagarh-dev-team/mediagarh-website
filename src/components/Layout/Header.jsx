'use client';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const NAV_LINKS = [];
export default function Header() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // label of the open submenu (only one at a time)
  const pathname = usePathname();

  const closeMenu = () => {
    setOpen(false);
    setOpenMenu(null);
  };

  // Opening one submenu automatically closes the previous one
  const toggleSub = (label) => setOpenMenu((prev) => (prev === label ? null : label));

  // Close the menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    const html = document.documentElement;
    html.style.overflow = open ? 'hidden' : '';
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      html.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on Escape, and when the screen grows to desktop size
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeMenu();
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e) => e.matches && closeMenu();

    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onChange);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onChange);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="custom-container flex h-[58px] items-center justify-between lg:h-[76px]">
          <Link href="/" className="shrink-0" onClick={closeMenu}>
            <Image
              src="/images/logo.svg"
              alt="AIMS IBS"
              width={83}
              height={57}
              priority
              quality={100}
              unoptimized
              className="h-10 w-auto lg:h-14.25"
            />
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-6 lg:flex">
            <nav className="flex items-center gap-6">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div key={link.label} className="group relative">
                    <Link
                      href={link.href}
                      className="flex items-center gap-1 py-5 text-[13px] font-medium uppercase tracking-wide text-black transition-colors group-hover:text-brand-orange"
                    >
                      {link.label}
                      <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                    </Link>
                    <div className="invisible absolute left-0 top-full min-w-70 translate-y-2 border bg-white py-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={(e) => e.currentTarget.closest('.group')?.querySelector('a')?.blur()}
                          className="block px-4 py-2 text-xs font-medium uppercase tracking-wide text-black transition-colors hover:bg-brand-orange/10 hover:text-brand-orange"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-1 py-5 text-[13px] font-medium uppercase tracking-wide text-black transition-colors hover:text-brand-orange"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>

            <Link
              href="/apply-now"
              className="rounded-[3px] border-2 border-brand-orange bg-brand-orange px-5 py-2.5 font-general-sans text-[13px] font-medium uppercase tracking-wide text-white transition-colors hover:border-[#d63f14] hover:bg-[#d63f14]"
            >
              Apply Now
            </Link>
            <Link
              href="/contact-us"
              className="rounded-[3px] border-2 border-brand-orange bg-white px-5 py-2.5 font-general-sans text-[13px] font-medium uppercase tracking-wide text-black transition-colors hover:bg-brand-orange hover:text-white"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => (open ? closeMenu() : setOpen(true))}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="font-general-sans lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile: dark overlay starting right below the header */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="overlay"
              aria-hidden="true"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute left-0 top-full z-0 h-[100svh] w-full bg-black/50 lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Mobile: menu panel (absolute, floats over the page) */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="panel"
              id="mobile-menu"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute left-0 right-0 top-full z-10 max-h-[calc(100svh-58px)] overflow-y-auto overscroll-contain border-t bg-white shadow-xl md:max-h-[calc(100svh-90px)] lg:hidden"
            >
              <nav className="custom-container flex flex-col py-2">
                {NAV_LINKS.map((link) => {
                  const isOpen = openMenu === link.label;

                  if (!link.children) {
                    return (
                      <div key={link.label} className="border-b">
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          className="block py-3 text-xs font-semibold uppercase tracking-wide transition-colors hover:text-brand-orange"
                        >
                          {link.label}
                        </Link>
                      </div>
                    );
                  }

                  return (
                    <div key={link.label} className="border-b">
                      <button
                        type="button"
                        onClick={() => toggleSub(link.label)}
                        aria-expanded={isOpen}
                        className={`flex w-full items-center justify-between py-3 text-xs font-semibold uppercase tracking-wide transition-colors ${
                          isOpen ? 'text-brand-orange' : 'hover:text-brand-orange'
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="pb-2">
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={closeMenu}
                                tabIndex={isOpen ? 0 : -1}
                                className="block py-2 pl-4 text-xs uppercase tracking-wide text-black/70 transition-colors hover:text-brand-orange"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="flex gap-3 py-4">
                  <Link
                    href="/apply-now"
                    onClick={closeMenu}
                    className="flex-1 rounded-[3px] bg-brand-orange py-3 text-center font-general-sans text-xs font-medium uppercase text-white"
                  >
                    Apply Now
                  </Link>
                  <Link
                    href="/contact-us"
                    onClick={closeMenu}
                    className="flex-1 rounded-[3px] border-2 border-brand-orange py-3 text-center font-general-sans text-xs font-medium uppercase"
                  >
                    Contact Us
                  </Link>
                </div>

                <div className="flex flex-wrap gap-x-5 gap-y-2 border-t pb-2 pt-4 text-[11px] font-medium uppercase text-black/70">
                  {TOP_LINKS.map((link) => (
                    <Link key={link.href} href={link.href} onClick={closeMenu}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
