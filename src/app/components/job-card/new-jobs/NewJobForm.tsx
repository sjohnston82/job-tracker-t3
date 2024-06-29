"use client";

import React, { type Dispatch, type SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import LocationRadioGroup from "./LocationRadioGroup";
import { useJobInfoStore } from "~/stores/jobInfoStore";
import USBasedLocationSelection from "./USBasedLocationSelection";
import OutsideUSLocationSelection from "./OutsideUSLocationSelection";
import { cn } from "~/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/helpers/api";
import { useAuthStore } from "~/stores/authStore";

interface INewJobFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface IAddJobApplication {
  owner: string;
  title: string;
  company: string;
  jobURL: string;
  isRemote: boolean;
  isUSBased: boolean;
  isOutsideUS: boolean;
  city?: string;
  state?: string;
  country?: string;
  salary?: string;
  salaryType?: string;
  jobType?: string;
  jobSource?: string;
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
  salary: z.string().optional(),
  jobURL: z.string().url(),
  city: z
    .string()
    .min(2, { message: "You need at least two characters" })
    .max(75, { message: "You have exceeded the characters amount." })
    .optional(),
  country: z
    .string()
    .min(2, { message: "You need at least two characters" })
    .max(75, { message: "You have exceeded the characters amount." })
    .optional(),
  state: z.string().optional(),
  salaryType: z.string().optional(),
  jobType: z.string().optional(),
  jobSource: z.string().optional(),
});

const NewJobForm = ({ setOpen }: INewJobFormProps) => {
  const [addingMoreInfo, setAddingMoreInfo] = useState(false);
  const {
    locationRadioSelection,
    city,
    state,
    country,
    setCity,
    setState,
    setCountry,
    setLocationRadioSelection,
  } = useJobInfoStore();
  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAddJobApplication>({
    // resolver: zodResolver(addJobApplicationSchema),
    defaultValues: {
      title: "",
      company: "",
      jobURL: "",
      salary: "",
      salaryType: "",
      jobType: "",
      jobSource: "",
    },
  });

  const utils = api.useUtils();

  const createNewJobApp =
    api.jobApplicationsRouter.createJobApplication.useMutation({
      onSuccess: () => utils.invalidate(),
      onError: (err) => console.log(err),
    });

  const showingAddMoreInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAddingMoreInfo(true);
  };

  const onSubmit = (data: IAddJobApplication) => {
    if (!user?.id) {
      console.error(
        "User ID is undefined. Please make sure the user is authenticated.",
      );
      console.log("no user");
      return;
    }

    const mutationData = {
      owner: user?.id,
      title: data.title,
      company: data.company,
      jobURL: data.jobURL,
      isRemote: locationRadioSelection === "remote",
      isUSBased: locationRadioSelection === "usbased",
      isOutsideUS: locationRadioSelection === "outsideus",
      country: country ?? "",
      state: state ?? "",
      city: city ?? "",
      dateApplied: new Date(Date.now()),
      jobSource: data.jobSource ?? "",
      jobType: data.jobType ?? "",
      salary: data.salary ?? "",
      salaryType: data.salaryType ?? "",

      // TODO:  add functonality for resumes, cover letters and projects
    };

    console.log("Mutation Data: ", mutationData);

    createNewJobApp.mutate(mutationData);

    reset();
    setCity("");
    setState("");
    setCountry("");
    setLocationRadioSelection("remote");
    setOpen(false);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        className="h-10 w-full rounded-full border-2 border-black text-center shadow-lg outline-none placeholder:text-center placeholder:font-semibold placeholder:text-slate-800"
        placeholder="Job Title"
        {...register("title")}
      />
      {errors.title && <p>{errors.title.message}</p>}
      <input
        type="text"
        className="h-10 w-full rounded-full border-2 border-black text-center shadow-lg outline-none placeholder:text-center placeholder:font-semibold placeholder:text-slate-800"
        placeholder="Company"
        {...register("company")}
      />
      {errors.company && <p>{errors.company.message}</p>}
      <input
        type="text"
        className="h-10 w-full rounded-full border-2 border-black text-center shadow-lg outline-none placeholder:text-center placeholder:font-semibold placeholder:text-slate-800"
        placeholder="Job Listing URL"
        {...register("jobURL")}
      />
      {errors.jobURL && <p>{errors.jobURL.message}</p>}
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
              type="number"
              className="h-10 w-full rounded-full border-2 border-black text-center shadow-lg outline-none placeholder:text-center placeholder:font-semibold placeholder:text-slate-800"
              placeholder="Salary"
              {...register("salary")}
            />
            {errors.salary && <p>{errors.salary.message}</p>}
            <select
              className="h-10 w-full rounded-full border-2 border-black text-center shadow-lg outline-none placeholder:text-center placeholder:font-semibold placeholder:text-slate-800"
              {...register("salaryType")}
            >
              <option value="">Type</option>
              <option value="yearly">Yearly</option>
              <option value="hourly">Hourly</option>
            </select>
          </div>
          <div className="flex gap-2">
            <select
              className="h-10 w-full rounded-full border-2 border-black text-center shadow-lg outline-none placeholder:text-center placeholder:font-semibold placeholder:text-slate-800"
              {...register("jobType")}
            >
              <option value="">Job Type</option>
              <option value="fullTime">Full-Time</option>
              <option value="partTime">Part-Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
            <select
              className="h-10 w-full rounded-full border-2 border-black text-center shadow-lg outline-none placeholder:text-center placeholder:font-semibold placeholder:text-slate-800"
              {...register("jobSource")}
            >
              <option value="">Job Source</option>
              <option value="linkedin">LinkedIn</option>
              <option value="indeed">Indeed</option>
              <option value="dice">Dice</option>
              <option value="wellfound">Wellfound</option>
              <option value="blind">Blind</option>
              <option value="careerPage">Career Page</option>
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
          Add More Info<span className="rotate-90">&#x25BE;</span>
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
