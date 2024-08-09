import React, { type ChangeEvent } from "react";
import { type JobApplication } from "~/lib/helpers/types";
import { cn } from "~/lib/utils";
import { useJobInfoStore } from "~/stores/jobInfoStore";

interface IUSBasedLocationProps {
  job?: JobApplication;
}

const USBasedLocationSelection = ({ job }: IUSBasedLocationProps) => {
  const { city, state, setCity, setState, isEditing, locationRadioSelection } =
    useJobInfoStore();

  const handleCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setState(event.target.value);
  };

  return (
    <div className="flex w-full gap-2">
      <input
        type="text"
        className={cn(
          "h-10 w-1/2 rounded-full border-2 border-black text-center shadow-lg outline-none placeholder:text-center placeholder:font-semibold placeholder:text-slate-800",
          {
            "h-[25px] w-full flex-1 rounded-none border-b border-l-0 border-r-0 border-t-0 border-black bg-green-200 text-center outline-none placeholder:text-center":
              isEditing,
          },
        )}
        onChange={handleCityChange}
        value={city}
        placeholder={
          job?.city && locationRadioSelection === "usbased" && !job.isOutsideUS
            ? job.city
            : "City"
        }
      />
      <select
        name="state"
        onChange={handleStateChange}
        value={state}
        className={cn(
          "h-10 w-1/2 rounded-full border-2 border-black text-center text-sm font-semibold text-slate-900 shadow-lg outline-none placeholder:text-center placeholder:font-semibold placeholder:text-slate-800",
          {
            "h-[25px] w-full flex-1 rounded-none border-b border-l-0 border-r-0 border-t-0 border-black bg-green-200 text-center outline-none placeholder:text-center":
              isEditing,
          },
        )}
      >
        <option value={job?.state ?? ""} disabled={!job}>
          {job?.state && !job.isOutsideUS ? job.state : "State"}
        </option>
        <option value="AL">AL</option>
        <option value="AK">AK</option>
        <option value="AR">AR</option>
        <option value="AZ">AZ</option>
        <option value="CA">CA</option>
        <option value="CO">CO</option>
        <option value="CT">CT</option>
        <option value="DC">DC</option>
        <option value="DE">DE</option>
        <option value="FL">FL</option>
        <option value="GA">GA</option>
        <option value="HI">HI</option>
        <option value="IA">IA</option>
        <option value="ID">ID</option>
        <option value="IL">IL</option>
        <option value="IN">IN</option>
        <option value="KS">KS</option>
        <option value="KY">KY</option>
        <option value="LA">LA</option>
        <option value="MA">MA</option>
        <option value="MD">MD</option>
        <option value="ME">ME</option>
        <option value="MI">MI</option>
        <option value="MN">MN</option>
        <option value="MO">MO</option>
        <option value="MS">MS</option>
        <option value="MT">MT</option>
        <option value="NC">NC</option>
        <option value="NE">NE</option>
        <option value="NH">NH</option>
        <option value="NJ">NJ</option>
        <option value="NM">NM</option>
        <option value="NV">NV</option>
        <option value="NY">NY</option>
        <option value="ND">ND</option>
        <option value="OH">OH</option>
        <option value="OK">OK</option>
        <option value="OR">OR</option>
        <option value="PA">PA</option>
        <option value="RI">RI</option>
        <option value="SC">SC</option>
        <option value="SD">SD</option>
        <option value="TN">TN</option>
        <option value="TX">TX</option>
        <option value="UT">UT</option>
        <option value="VT">VT</option>
        <option value="VA">VA</option>
        <option value="WA">WA</option>
        <option value="WI">WI</option>
        <option value="WV">WV</option>
        <option value="WY">WY</option>
      </select>
    </div>
  );
};

export default USBasedLocationSelection;
