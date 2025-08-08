import React from "react";

type PinButtonProps = {
  isCollapsed: boolean;
  sidebarPinned: boolean;
  onClick: () => void;
};

const SIDEBAR_WIDTH_COLLAPSED = 80;  // 5rem = 80px
const SIDEBAR_WIDTH_EXPANDED = 320; // 20rem = 320px
const BUTTON_SIZE = 44;

export default function PinButton({ isCollapsed, sidebarPinned, onClick }: PinButtonProps) {
  const buttonLeft = (isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED) - BUTTON_SIZE / 2;
  return (
    <button
      className={`
        absolute
        top-8
        z-50
        w-11 h-11 rounded-full
        flex items-center justify-center
        shadow
        border border-gray-200 dark:border-dark-border
        bg-white dark:bg-dark-surface
        transition-all duration-300
        group
      `}
      style={{ left: buttonLeft }}
      onClick={onClick}
      aria-label={sidebarPinned ? "Unpin Sidebar" : "Pin Sidebar"}
      type="button"
    >
      <span className="text-2xl">{sidebarPinned ? "📍" : "📌"}</span>
    </button>
  );
}
