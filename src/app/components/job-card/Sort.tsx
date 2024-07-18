import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useJobAppStore } from "~/stores/jobAppStore";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface ISortProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type LocationFilter = "" | "remote" | "usbased" | "outsideus";
const Sort = ({ setOpen }: ISortProps) => {
  const { sortBy, setSortBy, locationFilter, setLocationFilter } =
    useJobAppStore((state) => ({
      locationFilter: state.locationFilter,
      setLocationFilter: state.setLocationFilter,
      sortBy: state.sortBy,
      setSortBy: state.setSortBy,
    }));
  // const [locationFilter, setLocationFilter] = useState<LocationFilter>("");

  return (
    <div className="flex flex-col ">
      <div className="px-6">
        <div className="flex items-center justify-around">
          <p className="w-full text-left text-lg">Stage of Application</p>
          <div className="flex flex-col ">
            <ChevronUp
              className="-mb-[6px] cursor-pointer"
              color={sortBy === "stageOfApplication-asc" ? "black" : "gray"}
              onClick={() => {
                setSortBy("stageOfApplication-asc");
                setOpen(false);
              }}
            />
            <ChevronDown
              className="cursor-pointer"
              color={sortBy === "stageOfApplication-desc" ? "black" : "gray"}
              onClick={() => {
                setSortBy("stageOfApplication-desc");
                setOpen(false);
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-around">
          <p className="w-full text-left text-lg">Title</p>
          <div className="flex flex-col ">
            <ChevronUp
              className="-mb-[6px] cursor-pointer"
              color={sortBy === "title-asc" ? "black" : "gray"}
              onClick={() => {
                setSortBy("title-asc");
                setOpen(false);
              }}
            />
            <ChevronDown
              className="cursor-pointer"
              color={sortBy === "title-desc" ? "black" : "gray"}
              onClick={() => {
                setSortBy("title-desc");
                setOpen(false);
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-around">
          <p className="w-full bg-blue-200 text-left text-lg">Company</p>
          <div className="flex flex-col ">
            <ChevronUp
              className="-mb-[6px] cursor-pointer"
              color={sortBy === "company-asc" ? "black" : "gray"}
              onClick={() => {
                setSortBy("company-asc");
                setOpen(false);
              }}
            />
            <ChevronDown
              className="cursor-pointer"
              color={sortBy === "company-desc" ? "black" : "gray"}
              onClick={() => {
                setSortBy("company-desc");
                setOpen(false);
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-around">
          <p className="w-full text-left text-lg">Date Applied</p>
          <div className="flex flex-col ">
            <ChevronUp
              className="-mb-[6px] cursor-pointer"
              color={sortBy === "dateApplied-asc" ? "black" : "gray"}
              onClick={() => {
                setSortBy("dateApplied-asc");
                setOpen(false);
              }}
            />
            <ChevronDown
              className="cursor-pointer"
              color={sortBy === "dateApplied-desc" ? "black" : "gray"}
              onClick={() => {
                setSortBy("dateApplied-desc");
                setOpen(false);
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <Label className="py-3 text-center">Filter by Location</Label>
        <RadioGroup
          defaultValue=""
          className="flex w-full "
          value={locationFilter}
          onValueChange={setLocationFilter}
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="remote"
              id="remote"
              checked={locationFilter === "remote"}
            />
            <Label htmlFor="remote" className="">
              Remote
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="usbased"
              id="usbased"
              checked={locationFilter === "usbased"}
            />
            <Label htmlFor="usbased" className="">
              US Based
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="outsideus"
              id="outsideus"
              checked={locationFilter === "outsideus"}
            />
            <Label htmlFor="outsideus" className="">
              Outside US
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default Sort;
