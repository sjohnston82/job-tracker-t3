"use client";

import React, { useEffect } from "react";

import { type JobApplication } from "~/helpers/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LocationRadioGroup from "./new-jobs/LocationRadioGroup";
import { useJobInfoStore } from "~/stores/jobInfoStore";
import USBasedLocationSelection from "./new-jobs/USBasedLocationSelection";
import OutsideUSLocationSelection from "./new-jobs/OutsideUSLocationSelection";
import { Button } from "../ui/button";
import { api } from "~/helpers/api";

interface IEditingJobCardProps {
  job: JobApplication;
  modalCloseReset: () => void;
}

interface IEditJobApplication {
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

const editJobApplicationSchema = (locationRadioSelection: string) => {
  return z
    .object({
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
        // .min(2, { message: "You need at least two characters" })
        // .max(75, { message: "You have exceeded the characters amount." })
        .optional(),
      country: z.string().optional(),
      // .min(2, { message: "You need at least two characters" })
      // .max(75, { message: "You have exceeded the characters amount." })
      state: z.string().optional(),
      salaryType: z.string().optional(),
      jobType: z.string().optional(),
      jobSource: z.string().optional(),
      // isRemote: z.boolean().default(true),
    })
    .superRefine((data, ctx) => {
      if (locationRadioSelection === "usbased") {
        if (!data.state || data.state === "State" || data.state.trim() === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "State is required if location is US-based.",
            path: ["state"],
          });
        }
      } else if (locationRadioSelection === "outsideus") {
        if (
          !data.country ||
          data.country.trim() === "Country" ||
          data.country.trim() === ""
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Country is required if location is outside the US.",
            path: ["country"],
          });
        }
      }
      if (
        locationRadioSelection === "usbased" ||
        locationRadioSelection === "outsideus"
      ) {
        if (data.city && data.city.length < 2) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_small,
            minimum: 2,
            inclusive: true,
            type: "string",
            message: "City must be at least two characters.",
            path: ["city"],
          });
        }
      }
    });
};

const EditingJobInfo = ({ job, modalCloseReset }: IEditingJobCardProps) => {
  const {
    locationRadioSelection,
    setCity,
    setState,
    setCountry,
    city,
    state,
    country,
  } = useJobInfoStore();

  const jobURLString =
    typeof job.jobURL === "string"
      ? job.jobURL
      : new URL(String(job.jobURL)).toString();

  const formattedJobURL =
    jobURLString.startsWith("http://") || jobURLString.startsWith("https://")
      ? jobURLString
      : `https://${jobURLString}`;

  const editingJobApplicationSchema = editJobApplicationSchema(
    locationRadioSelection,
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IEditJobApplication>({
    resolver: zodResolver(editingJobApplicationSchema),
    defaultValues: {
      title: job.title ?? "",
      company: job.company ?? "",
      jobURL: formattedJobURL ?? "",
      salary: job.salary ?? "",
      salaryType: job.salaryType ?? "",
      jobType: job.jobType ?? "",
      jobSource: job.jobSource ?? "",
      city: job.city ?? "",
      state: job.state ?? "",
      country: job.country ?? "",
    },
  });
  console.log("Form Errors:", errors);
  const utils = api.useUtils();

  const editJobApp = api.jobApplicationsRouter.editJobApplication.useMutation({
    onSuccess: () => utils.invalidate(),
    onError: (err) => console.log(err),
  });

  useEffect(() => {
    if (city === "" && job.city) {
      setCity(job.city);
    }
    setValue("city", city);
  }, [city, setValue, job.city, setCity]);

  useEffect(() => {
    if (state === "" && job.state) {
      setState(job.state);
    }
    setValue("state", state);
  }, [state, setValue, job.state, setState]);

  useEffect(() => {
    if (country === "" && job.country) {
      setCountry(job.country);
    }
    setValue("country", country);
  }, [country, job.country, setCountry, setValue]);

  const onSubmit = (data: IEditJobApplication) => {
    const mutationData = {
      id: job.id,
      owner: job.owner,
      title: data.title,
      company: data.company,
      jobURL: data.jobURL,
      isRemote: locationRadioSelection === "remote",
      isUSBased: locationRadioSelection === "usbased",
      isOutsideUS: locationRadioSelection === "outsideus",
      country: data.country ?? "",
      state: data.state ?? "",
      city: data.city ?? "",
      dateApplied: new Date(Date.now()),
      jobSource: data.jobSource ?? "",
      jobType: data.jobType ?? "",
      salary: data.salary ?? "",
      salaryType: data.salaryType ?? "",
    };

    console.log("Mutation Data: ", mutationData);

    editJobApp.mutate(mutationData);

    reset();
    modalCloseReset();
    // setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative flex w-full flex-col items-center justify-center gap-2">
        <div className="w-full flex-col items-center justify-center gap-2 text-center">
          <p className="font-semibold underline ">Title: </p>
          <input
            className="w-full border-b border-black bg-green-200 text-center placeholder:text-center"
            placeholder={job.title ?? ""}
            {...register("title")}
          />
        </div>

        <div className="w-full flex-col items-center justify-center gap-2 text-center">
          <p className="font-semibold underline">Company: </p>
          <input
            className="w-full border-b border-black bg-green-200 text-center placeholder:text-center"
            placeholder={job.company ?? ""}
            {...register("company")}
          />
        </div>

        <div className="w-full flex-col items-center justify-center gap-2 text-center">
          <p className="font-semibold underline">Location: </p>

          <LocationRadioGroup job={job} />
          {locationRadioSelection === "usbased" ? (
            <USBasedLocationSelection job={job} />
          ) : locationRadioSelection === "outsideus" ? (
            <OutsideUSLocationSelection job={job} />
          ) : (
            locationRadioSelection === "remote"
          )}
        </div>

        <div className="w-full flex-col items-center justify-center gap-2 text-center">
          <p className="font-semibold underline">Salary: </p>
          <div className="flex gap-2">
            <>
              <span className="-mr-2">$</span>
              <input
                className="w-full flex-1 border-b border-black bg-green-200 text-center placeholder:text-center"
                placeholder={job.salary ?? ""}
                type="number"
                {...register("salary")}
              />
            </>
            <select
              className="flex-1 border-b border-black bg-green-200"
              {...register("salaryType")}
            >
              {job.salaryType === "" ? (
                <>
                  <option className="bg-green-200" value=""></option>
                  <option className="bg-green-200" value="hourly">
                    hourly
                  </option>
                  <option className="bg-green-200" value="yearly">
                    yearly
                  </option>
                </>
              ) : job.salaryType === "hourly" ? (
                <>
                  <option className="bg-green-200" value="hourly">
                    hourly
                  </option>
                  <option className="bg-green-200" value="yearly">
                    yearly
                  </option>
                </>
              ) : (
                <>
                  <option className="bg-green-200" value="yearly">
                    yearly
                  </option>
                  <option className="bg-green-200" value="hourly">
                    hourly
                  </option>
                </>
              )}
            </select>
          </div>
        </div>

        <div className="flex w-full gap-2">
          <div className="w-full flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold underline">Job Type:</p>
            <select
              id=""
              className="w-full flex-1 border-b border-black bg-green-200"
              {...register("jobType")}
            >
              <option value="">Job Type</option>
              <option value="fullTime">Full-Time</option>
              <option value="partTime">Part-Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>
          <div className="w-full flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold underline">Job Source:</p>
            <select
              {...register("jobSource")}
              id=""
              className="w-full flex-1 border-b border-black bg-green-200"
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

        <div className="w-full flex-col items-center justify-center gap-2 text-center">
          <p className="font-semibold underline">Job Posting URL: </p>
          <div className="flex">
            <input
              className="w-full flex-1 border-b border-black bg-green-200 text-center placeholder:text-center"
              // placeholder={job.jobURL as string ?? ""}
              type="text"
              {...register("jobURL")}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <Button variant="destructive" size="sm">
          Cancel
        </Button>
        <Button variant="outline" size="sm" type="submit">
          Apply Changes
        </Button>
      </div>
    </form>
  );
};

export default EditingJobInfo;
