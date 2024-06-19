"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import LocationRadioGroup from "./LocationRadioGroup";
import { useJobInfoStore } from "~/stores/jobInfoStore";
import USBasedLocationSelection from "./USBasedLocationSelection";
import OutsideUSLocationSelection from "./OutsideUSLocationSelection";
import { Button } from "../../ui/button";
import { cn } from "~/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/helpers/api";
import { useAuthStore } from "~/stores/AuthProvider";

interface IAddJobApplication {
  owner: string;
  title: string;
  company: string;
  jobListingURL: string;
  isRemote: boolean;
  isUSBased: boolean;
  isOutsideUS: boolean;
  city: string | undefined;
  state: string | undefined;
  country: string | undefined;
  salary: string | undefined;
  salaryType: string | undefined;
  jobType: string | undefined;
  jobSource: string | undefined;
}

const addJobApplicationSchema = z.object({
  title: z
    .string()
    .min(2, { message: "You need at least two characters" })
    .max(75, { message: "You have exceeded the characters amount." }),
  company: z
    .string()
    .min(2, { message: "You need at least two characters" })
    .max(75, { message: "You have exceeded the characters amount." }),
  city: z
    .string()
    .min(2, { message: "You need at least two characters" })
    .max(75, { message: "You have exceeded the characters amount." }),
  country: z
    .string()
    .min(2, { message: "You need at least two characters" })
    .max(75, { message: "You have exceeded the characters amount." }),
  salary: z.coerce.number().min(1),
});

const NewJobForm = () => {
  const [addingMoreInfo, setAddingMoreInfo] = useState(false);
  const { locationRadioSelection } = useJobInfoStore();
  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddJobApplication>({
    resolver: zodResolver(addJobApplicationSchema),
    defaultValues: {
      title: "",
      company: "",
      jobListingURL: "",
      salary: "",
      salaryType: "",
      jobType: "",
      jobSource: "",
    },
  });

  const createNewJobApp =
    api.jobApplicationsRouter.createJobApplication.useMutation({
      onSuccess: () => console.log("JobApplication created!"),
    });

  const showingAddMoreInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAddingMoreInfo(true);
  };

  const onSubmit = (data: IAddJobApplication) => {
    const mutationData = {
      owner: user?.id,
      title: data.title,
      company: data.company,
      jobListingURL: data.jobListingURL,
      isRemote: locationRadioSelection === "remote" ? "true" : "false",
      isUSBased: locationRadioSelection === "usbased" ? "true" : "false",
      isOutsideUS: locationRadioSelection === "outsideus" ? "true" : "false",

      // keep adding as necessary
    };
  };

  return (
    <form className="flex flex-col gap-4">
      <input
        type="text"
        className="h-10 w-full rounded-full border-2 border-black text-center shadow-lg outline-none placeholder:text-center placeholder:font-semibold placeholder:text-slate-800"
        placeholder="Job Title"
        {...register("title")}
      />

      <input
        type="text"
        className="h-10 w-full rounded-full border-2 border-black shadow-lg outline-none placeholder:text-center placeholder:font-semibold placeholder:text-slate-800"
        placeholder="Company"
        {...register("company")}
      />

      <input
        type="text"
        className="h-10 w-full rounded-full border-2 border-black shadow-lg outline-none placeholder:text-center placeholder:font-semibold placeholder:text-slate-800"
        placeholder="Job Listing URL"
        {...register("jobListingURL")}
      />

      <p className="text-center font-bold underline">Location</p>
      <LocationRadioGroup />
      {locationRadioSelection === "usbased" ? (
        <USBasedLocationSelection />
      ) : locationRadioSelection === "outsideus" ? (
        <OutsideUSLocationSelection />
      ) : (
        locationRadioSelection === "remote"
      )}

      {addingMoreInfo && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              className="h-10 w-full rounded-full border-2 border-black text-center shadow-lg outline-none placeholder:text-center placeholder:font-semibold placeholder:text-slate-800"
              placeholder="Salary"
              {...register("salary")}
            />
            <select
              className="h-10 w-full rounded-full border-2 border-black text-center shadow-lg outline-none placeholder:text-center placeholder:font-semibold placeholder:text-slate-800"
              {...register("salaryType")}
            >
              <option disabled value="">
                Type
              </option>
              <option value="yearly">Yearly</option>
              <option value="hourly">Hourly</option>
            </select>
          </div>
          <div className="flex gap-2">
            <select
              className="h-10 w-full rounded-full border-2 border-black text-center shadow-lg outline-none placeholder:text-center placeholder:font-semibold placeholder:text-slate-800"
              {...register("jobType")}
            >
              <option disabled value="">
                Job Type
              </option>
              <option value="fullTime">Full-Time</option>
              <option value="partTime">Part-Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
            <select
              className="h-10 w-full rounded-full border-2 border-black text-center shadow-lg outline-none placeholder:text-center placeholder:font-semibold placeholder:text-slate-800"
              {...register("jobSource")}
            >
              <option disabled value="">
                Job Source
              </option>
              <option value="linkedin">LinkedIn</option>
              <option value="indeed">Indeed</option>
              <option value="dice">Dice</option>
              <option value="wellfound">Wellfound</option>
              <option value="blind">Blind</option>
              <option value="companyCareerPage">Company Career Page</option>
              <option value="referral">Personal Referral</option>
            </select>
          </div>
        </div>
      )}
      <div className="flex justify-between">
        <button
          className={cn(
            "rounded-full bg-button-blue px-2 py-1 font-semibold text-white",
            {
              hidden: addingMoreInfo,
            },
          )}
          onClick={showingAddMoreInfo}
        >
          Add More Info<span className="rotate-90">&#x25BE;</span>{" "}
        </button>
        <button
          type="submit"
          className={cn(
            "rounded-full bg-button-blue px-2 py-1 font-semibold text-white",
            {
              "mx-auto": addingMoreInfo,
            },
          )}
        >
          Add Job
        </button>
      </div>
    </form>
  );
};

export default NewJobForm;
