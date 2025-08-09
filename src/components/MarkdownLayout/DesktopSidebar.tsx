import { Link } from 'gatsby';
import * as React from 'react';
import Logo from '../Logo';
import SidebarBottomButtons from './SidebarBottomButtons';
import PinButton from './SidebarNav/PinButton'; // ✅ import added
import { SidebarNav } from './SidebarNav/SidebarNav';

type DesktopSidebarProps = {
  pinned: boolean;
  hovering: boolean;
  setHovering: (hover: boolean) => void;
  togglePinned?: () => void; // optional: pass in toggle handler if needed
};

export default function DesktopSidebar({
  pinned,
  hovering,
  setHovering,
  togglePinned,
}: DesktopSidebarProps) {
  const isCollapsed = !pinned && !hovering;

  return (
    <div
      className="fixed top-0 bottom-0 left-0 z-10 hidden transition-all duration-300 ease-in-out lg:block"
      style={{ width: isCollapsed ? '5rem' : '20rem' }}
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

        {/* BOTTOM: Pin + other buttons */}
        {isCollapsed ? (
          // collapsed → all stacked
          <div className="flex flex-col border-t border-gray-200 dark:border-gray-800">
            <PinButton
              isCollapsed={isCollapsed}
              sidebarPinned={pinned}
              onClick={togglePinned}
            />
            <SidebarBottomButtons />
          </div>
        ) : (
          // expanded → pin separate above
          <>
            <div className="border-t border-gray-200 dark:border-gray-800">
              <PinButton
                isCollapsed={isCollapsed}
                sidebarPinned={pinned}
                onClick={togglePinned}
              />
            </div>
            <SidebarBottomButtons />
          </>
        )}
      </div>
    </div>
  );
}
