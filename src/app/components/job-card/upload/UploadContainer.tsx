"use client";

import React, { useState } from "react";
import { type JobApplication } from "~/lib/helpers/types";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import { Button } from "../../ui/button";
import UploadModalContent from "./UploadModalContent";
import { Separator } from "../../ui/separator";
import { api } from "~/lib/helpers/api";
import { UploadButton } from "~/lib/uploadthing";
import Link from "next/link";

interface IUploadContainerProps {
  job: JobApplication;
}

type DocType = "resume" | "coverLetter" | "project";

const UploadContainer = ({ job }: IUploadContainerProps) => {
  const [uploadingModalOpen, setUploadingModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [docType, setDocType] = useState<DocType | null>(null);

  const modalClose = () => {
    setUploadingModalOpen(!uploadingModalOpen);
  };

  const utils = api.useUtils();

  const uploadDocument =
    api.jobApplicationsRouter.uploadJobDocument.useMutation({
      onSuccess: () => utils.invalidate(),
      onError: (err) => console.log(err),
    });

  const upload = (type: DocType) => {
    setUploading(true);
    setDocType(type);
  };
  return (
    <div className="w-full flex-col items-center justify-center gap-2 text-center">
      <p className="font-semibold underline">Documents: </p>

      <div className="flex justify-between ">
        <div className="flex w-1/3 flex-col gap-1">
          <p className="text-sm font-semibold underline">Resume</p>
          {job.resumeUploadURL ? (
            <div className="flex flex-col gap-1">
              <Link href={`/upload?doc=${job.resumeUploadURL}`}>
                <Button variant="default" className="w-[96%] px-2">
                  View
                </Button>
              </Link>
              <Button
                variant="default"
                className="w-[96%] px-2"
                onClick={() => upload("resume")}
              >
                Change
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => upload("resume")}
              variant="default"
              className="w-[96%] px-2"
            >
              Upload
            </Button>
          )}
        </div>

        <div className="flex w-1/3 flex-col gap-1">
          <p className="text-sm font-semibold underline">Cover Letter</p>
          {job.coverLetterUploadURL ? (
            <div className="flex flex-col gap-1">
              <Link href={`/upload?doc=${job.coverLetterUploadURL}`}>
                <Button variant="default" className="w-[96%] px-2">
                  View
                </Button>
              </Link>
              <Button
                variant="default"
                className="w-[96%] px-2"
                onClick={() => upload("coverLetter")}
              >
                Change
              </Button>
            </div>
          ) : (
            <Button
              variant="default"
              className="w-[96%] px-2"
              onClick={() => upload("coverLetter")}
            >
              Upload
            </Button>
          )}
        </div>

        <div className="flex w-1/3 flex-col gap-1">
          <p className="text-sm font-semibold underline">Project</p>
          {job.projectURL ? (
            <div className="flex flex-col gap-1">
              <Link href={`/upload?doc=${job.projectURL}`}>
                <Button variant="default" className="w-[96%] px-2">
                  View
                </Button>
              </Link>
              <Button
                variant="default"
                className="w-[96%] px-2"
                onClick={() => upload("project")}
              >
                Change
              </Button>
            </div>
          ) : (
            <Button
              variant="default"
              className="w-[96%] px-2"
              onClick={() => upload("project")}
            >
              Upload
            </Button>
          )}
        </div>
      </div>
      {uploading && docType !== null && (
        <div className="flex justify-around gap-2 pt-4">
          <UploadButton
            appearance={{
              button:
                "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed ut-uploading:w-full rounded-r-none w-full bg-button-blue bg-none after:bg-orange-400",
              container:
                "w-2/3 flex-row rounded-md border-cyan-300 bg-slate-800",
              allowedContent:
                "flex h-8 flex-col items-center justify-center px-2 text-white",
            }}
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response

              uploadDocument.mutate({ id: job.id, docType, url: res[0]!.url });
              console.log("Files: ", res[0]?.url);
              alert("Upload Completed");
              setDocType(null);
              setUploading(false);
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
          <Button variant="destructive" className="w-1/3">
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default UploadContainer;
