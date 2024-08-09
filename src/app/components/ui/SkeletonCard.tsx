import React from "react";
import { Skeleton } from "./skeleton";

interface ISkeletonCardProps {
  totalItems: number;
}

const SkeletonCard = ({ totalItems }:ISkeletonCardProps) => {
  return (
    <>
      {Array.from({ length: totalItems }).map((_, index) => (
        <div className="flex flex-col  space-y-3" key={index}>
          <Skeleton className="h-[200px] w-[300px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[300px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonCard;
