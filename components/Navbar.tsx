import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/Link.png"
          width={35}
          height={80}
          alt="Link Up"
          className="max-sm:size-10"
        />
        <p className="text-white text-[26px] font-extrabold px-4">Link Up</p>
      </Link>

      <div className="flex-between gap-5">
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
