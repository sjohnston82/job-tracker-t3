import Link from 'next/link';
import React from 'react'
import JTLogo from "../../../../../public/images/JT.png";
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="flex w-48 items-center gap-2">
        <Image src={JTLogo} alt="JT Logo" height={48} width={48} className="" />
        <h1 className="text-2xl font-bold">JobTracker</h1>
      </div>
    </Link>
  );
}

export default Logo