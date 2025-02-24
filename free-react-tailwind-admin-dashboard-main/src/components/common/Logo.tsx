import React from 'react';
import { Link } from 'react-router';

interface LogoProps {
  expanded?: boolean;
}

const Logo: React.FC<LogoProps> = ({ expanded = true }) => {
  return (
    <Link to="/" className="flex items-center gap-3">
      <img
        className="dark:hidden"
        src="/images/logo/logo-icon.svg"
        alt="Logo"
        width={32}
        height={32}
      />
      <img
        className="hidden dark:block"
        src="/images/logo/logo-icon.svg"
        alt="Logo"
        width={32}
        height={32}
      />
      {expanded && (
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Fawri
        </span>
      )}
    </Link>
  );
};

export default Logo;
