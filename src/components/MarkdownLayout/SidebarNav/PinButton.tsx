import React from 'react';
import { useMarkdownLayout } from '../../../context/MarkdownLayoutContext';

const SIDEBAR_WIDTH_COLLAPSED = 80; // 5rem = 80px
const SIDEBAR_WIDTH_EXPANDED = 320; // 20rem = 320px
const BUTTON_SIZE = 44;

export default function PinButton() {
  const { isSidebarPinned, setIsSidebarPinned, setIsSidebarHovering } =
    useMarkdownLayout();
  const isCollapsed = !isSidebarPinned;

  const buttonLeft =
    (isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED) -
    BUTTON_SIZE / 2;
  return (
    <button
      className={`dark:border-dark-border dark:bg-dark-surface group absolute top-8 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow transition-all duration-300`}
      style={{ left: buttonLeft }}
      onMouseEnter={() => setIsSidebarHovering(true)}
      onMouseLeave={() => setIsSidebarHovering(false)}
      onClick={() => setIsSidebarPinned(!isSidebarPinned)}
      aria-label={isSidebarPinned ? 'Unpin Sidebar' : 'Pin Sidebar'}
      type="button"
    >
      <span className="text-2xl">{isSidebarPinned ? '📍' : '📌'}</span>
    </button>
  );
}
