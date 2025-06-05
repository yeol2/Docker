'use client';

import { navbarAtom } from '@/store';
import { cn } from '@/utils/style';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRef } from 'react';
import { CancelIcon, LogoIcon, MenuIcon } from '../icons';
import { NavBar } from './NavBar';

export function Header() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isNavbarOpen, setIsNavbarOpen] = useAtom(navbarAtom);

  return (
    <header className="sticky top-0 w-full bg-white overflow-hidden z-40">
      <section
        className={cn(
          'flex justify-between items-center z-40 px-6 py-4 h-16 border-b border-soft-grey',
          isNavbarOpen
            ? 'border-b-white'
            : 'transition-colors duration-300 ease-in-out',
        )}
      >
        <Link href="/">
          <LogoIcon width={92} />
        </Link>
        <button
          ref={buttonRef}
          type="button"
          className="cursor-pointer"
          onClick={() => setIsNavbarOpen((prev) => !prev)}
        >
          {isNavbarOpen ? (
            <CancelIcon width={18} height={18} fill="var(--color-dark-grey)" />
          ) : (
            <MenuIcon width={24} height={24} fill="var(--color-dark-grey)" />
          )}
        </button>
      </section>
      <NavBar triggerRef={buttonRef} />
    </header>
  );
}
