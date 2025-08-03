import { Link } from 'gatsby';
import * as React from 'react';
import Logo from '../Logo';
import SidebarBottomButtons from './SidebarBottomButtons';
import { SidebarNav } from './SidebarNav/SidebarNav';

type DesktopSidebarProps = {
  pinned: boolean;
  hovering: boolean;
  setHovering: (hover: boolean) => void;
};

export default function DesktopSidebar({
  pinned,
  hovering,
  setHovering,
}: DesktopSidebarProps) {
  const isCollapsed = !pinned && !hovering;

  // Only respond to mouse events when NOT pinned
  return (
    <div
      className="fixed top-0 bottom-0 left-0 z-10 hidden lg:block transition-all duration-300 ease-in-out"
      style={{ width: isCollapsed ? '5rem' : '20rem' }}
      onMouseEnter={() => { if (!pinned) setHovering(true); }}
      onMouseLeave={() => { if (!pinned) setHovering(false); }}
    >
      <div
        className="dark:bg-dark-surface flex h-screen flex-col border-r border-gray-200 bg-white dark:border-gray-800 transition-all duration-300 ease-in-out"
        style={{ width: isCollapsed ? '5rem' : '20rem' }}
      >
        {/* TOP: Logo */}
        <div className="flex h-0 grow flex-col pt-5">
          <Link
            className={`flex shrink-0 items-center ${isCollapsed ? 'justify-center' : ''} px-4 pb-2`}
            to="/dashboard/"
          >
            <Logo />
          </Link>
          <SidebarNav isCollapsed={isCollapsed} />
        </div>
        {/* 📌 Pin button REMOVED from here */}
        <SidebarBottomButtons />
      </div>
    </div>
  );
}
