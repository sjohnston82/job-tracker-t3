import Link from 'next/link';
import React from 'react'
import JTLogo from "../../../../public/images/JT.webp";
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="flex w-48 items-center gap-2">
        <Image src={JTLogo} alt="JT Logo" height={40} width={40} className="" />
        <h1 className="text-xl font-bold">JobTracker</h1>
      </div>
    </Link>
  );
}

export default Logo