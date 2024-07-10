"use client";

import React, { useCallback, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { useJobInfoStore } from "~/stores/jobInfoStore";
import { type JobApplication } from "~/helpers/types";

interface ILocationRadioGroupProps {
  job?: JobApplication;
}

const LocationRadioGroup = ({ job }: ILocationRadioGroupProps) => {
  const { locationRadioSelection, setLocationRadioSelection, setCity } =
    useJobInfoStore();

  const handleRadioChange = useCallback(
    (value: "remote" | "usbased" | "outsideus") => {
      setLocationRadioSelection(value);
      
    },
    [setLocationRadioSelection],
  );

  useEffect(() => {
    if (job && job.isUSBased) {
      handleRadioChange("usbased");
    }
    if (job && job.isOutsideUS) {
      handleRadioChange("outsideus");
    }
  }, [handleRadioChange, job]);

  return (
    <div className="flex ">
      <RadioGroup
        defaultValue={
          job && job.isRemote
            ? "remote"
            : job && job.isUSBased
              ? "usbased"
              : job && job.isOutsideUS
                ? "outsideus"
                : "remote"
        }
        className="flex w-full items-center justify-center"
      >
        <div className="flex items-center gap-[2px]">
          <RadioGroupItem
            value="remote"
            checked={locationRadioSelection === "remote"}
            onClick={() => handleRadioChange("remote")}
          ></RadioGroupItem>
          <p className="text-sm">Remote</p>
        </div>
        <div className="flex items-center gap-[2px]">
          <RadioGroupItem
            value="usbased"
            checked={locationRadioSelection === "usbased"}
            onClick={() => handleRadioChange("usbased")}
          ></RadioGroupItem>
          <p className="text-sm">US Based</p>
        </div>
        <div className="flex items-center gap-[2px]">
          <RadioGroupItem
            value="outsideus"
            checked={locationRadioSelection === "outsideus"}
            onClick={() => handleRadioChange("outsideus")}
          ></RadioGroupItem>
          <p className="text-sm">Outside US</p>
        </div>
      </RadioGroup>
    </div>
  );
};

export default LocationRadioGroup;
