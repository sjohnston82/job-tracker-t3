import { useRef } from "react";
import { useClickOutside } from "~/lib/hooks/useClickOutside";
import { useUIStore } from "~/stores/uiStore";
import { signOut } from "next-auth/react";

const UserOptionsDropDown = () => {
  const { closeUserNavMenu } = useUIStore();

  const ref = useClickOutside(() => {
    closeUserNavMenu();
  });

  return (
    <div
      className="absolute right-1 top-20 z-20 flex w-32 flex-col border"
      ref={ref}
    >
      <ul className="">
        <li className="">View Profile</li>
        <li className="cursor-pointer" onClick={() => signOut()}>Log out</li>
      </ul>
    </div>
  );
};
export default UserOptionsDropDown;
