import clsx from 'clsx';
import * as React from 'react';
import { useEffect } from 'react';
import useStickyState from '../../../hooks/useStickyState';

export default function Accordion({ label, isActive, children, isCollapsed }) {
  const [expanded, setExpanded] = useStickyState(
    true,
    'guide:sidebarnav:isexpanded:' + label
  );

  useEffect(() => {
    if (isActive) setExpanded(true);
  }, [isActive]);

  const shouldShowChildren = expanded && !isCollapsed;

  return (
    <div
      className={clsx(
        'border-b border-gray-200 last:border-b-0 dark:border-gray-800',
        isActive && 'bg-[#f7faff] dark:bg-[#16191f]'
      )}
    >
      <div
        className="relative flex cursor-pointer items-center px-4 py-3 text-sm leading-5 font-semibold transition duration-150 ease-in-out hover:bg-blue-50 dark:hover:bg-gray-900"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Show label only when expanded */}
        {!isCollapsed && (
          <span className="dark:text-dark-high-emphasis flex-1 text-gray-800">
            {label}
          </span>
        )}

        {/* ▶️ / 🔽 icon based on actual expand state */}
        <svg
          className="h-5 w-5 shrink-0 text-gray-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          {expanded ? (
            // 🔽 Down arrow
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06 0L10 10.94l3.71-3.73a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          ) : (
            // ▶️ Right arrow
            <path
              fillRule="evenodd"
              d="M7.21 5.23a.75.75 0 011.06 0l4.25 4.24a.75.75 0 010 1.06l-4.25 4.24a.75.75 0 01-1.06-1.06L10.44 10 7.21 6.29a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          )}
        </svg>
      </div>

      {shouldShowChildren && children}
    </div>
  );
}
