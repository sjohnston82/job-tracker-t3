import React, { type ChangeEvent } from "react";
import { useJobInfoStore } from "~/stores/jobInfoStore";

const USBasedLocationSelection = () => {
  const { city, state, setCity, setState } = useJobInfoStore();

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
        className="h-10 w-2/3 rounded-full border-2 border-black text-center shadow-lg outline-none placeholder:text-center placeholder:font-semibold placeholder:text-slate-800"
        onChange={handleCityChange}
        value={city}
        placeholder="City"
      />
      <select
        name="state"
        onChange={handleStateChange}
        value={state}
        className="h-10 w-1/3 rounded-full border-2 border-black text-center font-semibold text-slate-900 shadow-lg outline-none placeholder:text-center placeholder:font-semibold placeholder:text-slate-800"
      >
        <option value="" disabled className="font-semibold text-slate-900">
          State
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
