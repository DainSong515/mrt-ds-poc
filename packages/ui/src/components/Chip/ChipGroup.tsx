import React, { useState } from 'react';

import { Chip } from './Chip';
import type { ChipProps } from './Chip.types';

interface ChipOption {
  id: string;
  label: string;
}

interface ChipGroupProps {
  options: ChipOption[];
  defaultSelected?: string;
  variant?: ChipProps['variant'];
  size?: ChipProps['size'];
  onChange?: (selectedId: string) => void;
}

/** 가로 스크롤 단일 선택 필터바 */
export function ChipGroup({
  options,
  defaultSelected,
  variant = 'filled',
  size = 'medium',
  onChange,
}: ChipGroupProps) {
  const [selected, setSelected] = useState(defaultSelected ?? options[0]?.id);

  function handleSelect(id: string) {
    setSelected(id);
    onChange?.(id);
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        padding: '0 16px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {options.map((option) => (
        <Chip
          key={option.id}
          variant={variant}
          size={size}
          selected={selected === option.id}
          onClick={() => handleSelect(option.id)}
        >
          {option.label}
        </Chip>
      ))}
    </div>
  );
}

export default ChipGroup;
