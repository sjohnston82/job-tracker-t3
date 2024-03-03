import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useAuthStore } from "~/stores/AuthProvider";
import GrayAvatar from "../../../../../../public/images/gray-avatar-icon.png";
import Image from "next/image";
import { useUIStore } from "~/stores/uiStore";
import UserOptionsDropDown from "./UserOptionsDropDown";

const UserOptions = () => {
  const { data: sessionData } = useSession();
  const { user } = useAuthStore();

  // const [open, setOpen] = useState(false);

  // const handleOpen = () => {
  //   setOpen(!open);
  // };

  const { showUserNavMenu, openUserNavMenu } = useUIStore();

  return (
    <div
      className="group relative flex w-full cursor-pointer items-center gap-1"
      onClick={() => openUserNavMenu()}
    >
      {user?.image ? (
        <Image
          src={user?.image}
          alt={user.name ?? "Avatar"}
          height={48}
          width={48}
          className="rounded-full"
        />
      ) : (
        <Image
          src={GrayAvatar}
          alt="Gray avatar image"
          height={48}
          width={48}
        />
      )}
      <span className="text-sm">&#9660;</span>
      {showUserNavMenu ? <UserOptionsDropDown /> : <></>}
    </div>
  );
};

export default UserOptions;
