import React from "react";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { useJobInfoStore } from "~/stores/jobInfoStore";

const LocationRadioGroup = () => {
  const { locationRadioSelection, setLocationRadioSelection } =
    useJobInfoStore();

  const handleRadioChange = (value: "remote" | "usbased" | "outsideus") => {
    setLocationRadioSelection(value);
  };

  return (
    <div className="flex ">
      <RadioGroup
        defaultValue="remote"
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
