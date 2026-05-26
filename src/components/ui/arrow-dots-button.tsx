import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type Button05Props = {
  label: string;
  to?: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
  variant?: 'dark' | 'light';
};

export const Button05 = ({
  label,
  to,
  href,
  onClick,
  className,
  variant = 'dark',
}: Button05Props) => {
  const Component = (to ? Link : href ? 'a' : 'button') as React.ElementType;
  const componentProps = to ? { to } : href ? { href } : { type: 'button' };

  // Function to generate dot elements for the icons
  const renderDots = () => {
    const dotValues = [2, 1, 0, 1, 2];
    return dotValues.map((value, index) => (
      <span
        key={`dot-${index}`}
        className="button05_dot"
        style={{ '--index': value } as React.CSSProperties}
      ></span>
    ));
  };

  // Function to generate icon elements with dots
  const renderIcons = () => {
    return [3, 2, 1, 0].map((indexParent) => (
      <span
        key={`icon-${indexParent}`}
        className="button05_icon"
        style={{ '--index-parent': indexParent } as React.CSSProperties}
      >
        {renderDots()}
      </span>
    ));
  };

  return (
    <Component
      {...componentProps}
      onClick={onClick}
      className={cn('button05 w-inline-block', className)}
      data-variant={variant}
    >
      <span className="button05_bg"></span>
      <span
        data-text={label}
        className="button05_inner"
      >
        <span className="button05_text">{label}</span>
        <span className="button05_icon-wrap">
          {renderIcons()}
        </span>
      </span>
    </Component>
  );
};
