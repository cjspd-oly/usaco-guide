import { Link } from 'gatsby';
import * as React from 'react';
import Logo from '../Logo';
import SidebarBottomButtons from './SidebarBottomButtons';
import { SidebarNav } from './SidebarNav/SidebarNav';

export default function DesktopSidebar() {
  const [isPinned, setIsPinned] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  const isCollapsed = !isPinned && !isHovering;

  // ⛔ Detect outside clicks when not pinned
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        if (!isPinned) {
          setIsHovering(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPinned]);

  return (
    <div
      ref={sidebarRef}
      className="fixed top-0 bottom-0 left-0 z-10 hidden lg:block transition-all duration-300 ease-in-out"
      style={{ width: isCollapsed ? '5rem' : '20rem' }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        if (!isPinned) setIsHovering(false);
      }}
    >
      <div
        className="dark:bg-dark-surface flex h-screen flex-col border-r border-gray-200 bg-white dark:border-gray-800 transition-all duration-300 ease-in-out"
        style={{ width: isCollapsed ? '5rem' : '20rem' }}
      >
        {/* TOP: Logo */}
        <div className="flex h-0 grow flex-col pt-5">
          <Link
            className={`flex shrink-0 items-center ${
              isCollapsed ? 'justify-center' : ''
            } px-4 pb-2`}
            to="/dashboard/"
          >
            <Logo />
          </Link>

          <SidebarNav isCollapsed={isCollapsed} />
        </div>

        {/* 📌 Pin Button */}
        {!isCollapsed && (
          <div className="px-4 pb-3">
            <button
              onClick={() => setIsPinned(prev => !prev)}
              className={`w-full rounded px-3 py-2 text-sm font-medium ${
                isPinned
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-100 text-blue-900 hover:bg-blue-200'
              }`}
            >
              {isPinned ? '📍 Pinned' : '📌 Pin Sidebar'}
            </button>
          </div>
        )}

        <SidebarBottomButtons />
      </div>
    </div>
  );
}
