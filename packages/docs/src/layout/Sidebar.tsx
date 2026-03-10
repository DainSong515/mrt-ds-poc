import React from 'react';
import { NavLink } from 'react-router-dom';

type NavLeaf = { label: string; href: string; exact?: boolean };
type NavGroup = { group: string; items: NavLeaf[] };
type NavEntry = NavLeaf | NavGroup;

const NAV_ITEMS: NavEntry[] = [
  { label: 'Overview', href: '/', exact: true },
  {
    group: 'Components',
    items: [
      { label: 'Button', href: '/components/button' },
      { label: 'Text', href: '/components/text' },
      { label: 'Icon', href: '/components/icon' },
      { label: 'Chip', href: '/components/chip' },
    ],
  },
  {
    group: 'Tokens',
    items: [
      { label: 'Color', href: '/tokens/color' },
      { label: 'Typography', href: '/tokens/typography' },
      { label: 'Shadow', href: '/tokens/shadow' },
    ],
  },
];

function NavItem({ label, href, exact }: NavLeaf) {
  return (
    <NavLink
      to={href}
      end={exact}
      className={({ isActive }) =>
        `block px-3 py-1.5 rounded-md text-sm transition-colors ${
          isActive
            ? 'bg-gray-100 text-gray-900 font-medium'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }`
      }
    >
      {label}
    </NavLink>
  );
}

export function Sidebar() {
  return (
    <aside className="w-56 shrink-0 border-r border-gray-200 bg-white h-full overflow-y-auto">
      <nav className="p-4 space-y-4">
        {NAV_ITEMS.map((item) => {
          if ('href' in item) {
            return <NavItem key={item.href} label={item.label} href={item.href} exact={item.exact} />;
          }
          return (
            <div key={item.group}>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1">
                {item.group}
              </p>
              <div className="space-y-0.5">
                {item.items.map((child) => (
                  <NavItem key={child.href} label={child.label} href={child.href} />
                ))}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
