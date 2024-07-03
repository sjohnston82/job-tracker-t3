import React from "react";
import { transformStageOfApplication } from "~/helpers/string-functions";
import { type JobApplication } from "~/helpers/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LocationRadioGroup from "./new-jobs/LocationRadioGroup";
import { useJobInfoStore } from "~/stores/jobInfoStore";
import USBasedLocationSelection from "./new-jobs/USBasedLocationSelection";
import OutsideUSLocationSelection from "./new-jobs/OutsideUSLocationSelection";

interface IEditingJobCardProps {
  job: JobApplication;
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

const editJobApplicationSchema = z.object({
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

const EditingJobInfo = ({ job }: IEditingJobCardProps) => {

  const { locationRadioSelection } = useJobInfoStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IEditJobApplication>({
    resolver: zodResolver(editJobApplicationSchema),
    defaultValues: {
      title: job.title ?? "",
      company: job.company ?? "",
      jobURL: (job.jobURL as string) ?? "",
      salary: job.salary ?? "",
      salaryType: job.salaryType ?? "",
      jobType: job.jobType ?? "",
      jobSource: job.jobSource ?? "",
    },
  });

  const jobURLString =
    typeof job.jobURL === "string"
      ? job.jobURL
      : new URL(String(job.jobURL)).toString();

  const formattedJobURL =
    jobURLString.startsWith("http://") || jobURLString.startsWith("https://")
      ? jobURLString
      : `https://${jobURLString}`;

  return (
    <form action="">
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
          <p className="font-semibold underline">Stage of Application: </p>
          <p className="w-full bg-light-gray">
            {transformStageOfApplication(job.stageOfApplication)}
          </p>
        </div>

        <div className="w-full flex-col items-center justify-center gap-2 text-center">
          <p className="font-semibold underline">Location: </p>
          {/* <p className="w-full bg-light-gray">
            {job.isRemote
              ? "Remote"
              : job.isUSBased
                ? `${job.city}, ${job.state}`
                : `${job.city}, ${job.country}`}
          </p> */}
          <LocationRadioGroup job={job} />
          {locationRadioSelection === "usbased" ? (
            <USBasedLocationSelection />
          ) : locationRadioSelection === "outsideus" ? (
            <OutsideUSLocationSelection />
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
            <select name="" id="" className="flex-1 bg-green-200">
              {/* <option
                value={job.salaryType ?? ""}
                disabled={job.salaryType === ""}
                className=""
              >
                {job.salaryType}
              </option>
              <option
                value={job.salaryType === "" ? "yearly" : "hourly"}
                className=""
              >
                {job.salaryType === "hourly" ? "yearly" : "hourly"}
              </option>
              {job.salaryType === "yearly" && <option value="yearly">yearly</option>}
              {job.salaryType === "" && <option value="hourly">hourly</option>} */}
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

        <div className="flex w-full">
          <div className="w-full flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold underline">Job Type:</p>
            {job.jobType ? (
              <p className="w-full bg-light-gray">{job.jobType}</p>
            ) : (
              <p className="w-full bg-light-gray">Unknown</p>
            )}
          </div>
          <div className="w-full flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold underline">Job Source:</p>
            {job.jobSource ? (
              <p className="w-full bg-light-gray">{job.jobSource}</p>
            ) : (
              <p className="w-full bg-light-gray">Unknown</p>
            )}
          </div>
        </div>

        <div className="w-full flex-col items-center justify-center gap-2 text-center">
          <p className="font-semibold underline">Job Posting URL: </p>
          <div className="flex">
            <p className="w-full bg-light-gray">
              <a
                href={formattedJobURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Link
              </a>
            </p>
            <p className="">POOP</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditingJobInfo;
