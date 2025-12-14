import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <div className="flex absolute z-100 w-full justify-center py-2 mb-40">
      <Link href="/" className="group relative inline-block" aria-label="Home">
        <span className="inline-block font-great-vibes text-[60px]! md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 drop-shadow-2xl transition-all duration-300 group-hover:scale-105">
          10A Christmas
        </span>

        <span className="block h-1 w-full origin-center scale-x-0 bg-gradient-to-r from-transparent via-orange-400 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
      </Link>
    </div>
  );
};

export default Header;
