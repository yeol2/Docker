import { AUTH_PATH, PROJECT_PATH, ROOT_PATH } from '@/constants';
import { useLogout } from '@/features/auth/hooks';
import { useOutsideClick } from '@/hooks';
import { isLoggedInAtom, navbarAtom } from '@/store';
import { cn } from '@/utils/style';
import { useAtom, useAtomValue } from 'jotai';
import Link from 'next/link';
import { RefObject, useRef } from 'react';
import { NavMenuItem } from './NavMenuItem';

type NavbarProps = {
  triggerRef: RefObject<HTMLButtonElement | null>;
};

export function NavBar({ triggerRef }: NavbarProps) {
  const navbarRef = useRef<HTMLElement>(null);
  const refs = triggerRef ? [navbarRef, triggerRef] : navbarRef;

  const [isNavbarOpen, setIsNavbarOpen] = useAtom(navbarAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  const { mutate: logout } = useLogout();

  const menuList = [
    {
      label: '홈으로',
      href: ROOT_PATH,
    },
    {
      label: '프로젝트',
      href: PROJECT_PATH.ROOT,
    },
  ];
  const menuHeight = `${1 + 3 * (menuList.length + 1)}rem`;

  useOutsideClick(refs, () => {
    if (isNavbarOpen) setIsNavbarOpen(false);
  });

  const handleLogoutClick = () => {
    logout();
    setIsNavbarOpen(false);
  };
  return (
    <nav
      ref={navbarRef}
      className={cn(
        'px-8 bg-white transition-all duration-200 ease-in-out z-40',
        isNavbarOpen ? 'pb-4 border-b border-soft-grey' : 'h-0 overflow-hidden',
      )}
      style={{ height: isNavbarOpen ? menuHeight : '0' }}
    >
      <ul>
        {menuList.map((menu) => (
          <NavMenuItem key={menu.href} label={menu.label} href={menu.href} />
        ))}
        {isLoggedIn ? (
          <li className="flex w-full h-12">
            <button
              className="flex items-center px-4 w-full h-full hover:bg-light-blue rounded-md transition-colors duration-200 cursor-pointer"
              onClick={handleLogoutClick}
            >
              로그아웃
            </button>
          </li>
        ) : (
          <li className="flex w-full h-12">
            <Link
              href={AUTH_PATH.LOGIN}
              className="flex items-center px-4 w-full h-full hover:bg-light-blue rounded-md transition-colors duration-200"
              onClick={() => setIsNavbarOpen(false)}
            >
              로그인하러 가기
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
