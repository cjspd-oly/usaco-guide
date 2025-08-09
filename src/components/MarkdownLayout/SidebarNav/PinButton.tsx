import React from 'react';

type PinButtonProps = {
  isCollapsed: boolean;
  sidebarPinned: boolean;
  onClick: () => void;
};

const SIDEBAR_WIDTH_COLLAPSED = 80; // 5rem = 80px
const SIDEBAR_WIDTH_EXPANDED = 320; // 20rem = 320px
const BUTTON_SIZE = 44;

export default function PinButton({
  isCollapsed,
  sidebarPinned,
  onClick,
}: PinButtonProps) {
  return (
    <button
      className={`dark:text-dark-med-emphasis flex items-center border-b border-gray-200 p-4 text-sm leading-5 font-medium text-gray-600 transition duration-150 ease-in-out hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-100 focus:outline-hidden dark:border-gray-800 dark:hover:bg-gray-900 dark:focus:bg-gray-900 ${isCollapsed ? 'justify-center' : ''} `}
      onClick={onClick}
      aria-label={sidebarPinned ? 'Unpin Sidebar' : 'Pin Sidebar'}
      type="button"
    >
      <span className="text-xl">{sidebarPinned ? '📍' : '📌'}</span>
      {!isCollapsed && <span className="ml-4">Pin Sidebar</span>}
    </button>
  );
}
