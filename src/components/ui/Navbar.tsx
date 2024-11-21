"use client";

import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 flex items-center px-8 py-3 justify-between z-10 transition-all bg-indigo-300">
      {/* Empty div to balance spacing */}
      <div className="flex-1"></div>

      {/* Centered Logo and Title */}
      <Link href="/" className="flex-1">
        <div className="font-bold text-2xl flex justify-center items-center gap-2">
          <Image src="/clipboard.png" alt="no image" width={50} height={40}></Image>
          Agent - List
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="flex-1 flex justify-end px-2 pl-6 space-x-6 items-center">
        <Link href="/about">
          <nav className="text-black font-bold">About</nav>
        </Link>
        <Link href="https://docs.retellai.com/api-references/create-agent">
          <nav className="text-black font-bold">Api</nav>
        </Link>
        <Link href="/Contact">
          <nav className="text-black font-bold">Contact</nav>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
