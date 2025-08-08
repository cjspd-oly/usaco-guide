import { Link } from 'gatsby';
import * as React from 'react';
import { useMarkdownLayout } from '../../context/MarkdownLayoutContext';
import Logo from '../Logo';
import SidebarBottomButtons from './SidebarBottomButtons';
import { SidebarNav } from './SidebarNav/SidebarNav';

export default function DesktopSidebar() {
  const { isSidebarPinned, isSidebarHovering, setIsSidebarHovering } =
    useMarkdownLayout();
  const isCollapsed = !isSidebarPinned && !isSidebarHovering;

  // show hover when NOT pinned
  return (
    <div
      className="fixed top-0 bottom-0 left-0 z-10 hidden transition-all duration-300 ease-in-out lg:block"
      style={{ width: isCollapsed ? '5rem' : '20rem' }}
      onMouseEnter={() => {
        if (!isSidebarPinned) setIsSidebarHovering(true);
      }}
      onMouseLeave={() => {
        if (!isSidebarPinned) setIsSidebarHovering(false);
      }}
    >
      <div
        className="dark:bg-dark-surface flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 ease-in-out dark:border-gray-800"
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
