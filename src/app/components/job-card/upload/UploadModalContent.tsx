"use client";

import React, { useState } from "react";
import { api } from "~/lib/helpers/api";
import { type JobApplication } from "~/lib/helpers/types";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { UploadButton } from "~/lib/uploadthing";

interface IUploadModalProps {
  job: JobApplication;
  modalClose: () => void;
}

type DocType = "resume" | "coverLetter" | "project";

const UploadModalContent = ({ job, modalClose }: IUploadModalProps) => {
  const [docType, setDocType] = useState<DocType | null>(null);

  const utils = api.useUtils();

  const uploadDocument =
    api.jobApplicationsRouter.uploadJobDocument.useMutation({
      onSuccess: () => utils.invalidate(),
      onError: (err) => console.log(err),
    });

  return (
    <main className="flex flex-col items-center  ">
      <p>Choose document type:</p>
      <div className="">
        <RadioGroup>
          <div className="flex items-center gap-1">
            <RadioGroupItem
              value="resume"
              checked={docType === "resume"}
              onClick={() => setDocType("resume")}
            ></RadioGroupItem>
            <p className="">Resume</p>

            <div className="flex items-center gap-1">
              <RadioGroupItem
                value="coverLetter"
                checked={docType === "coverLetter"}
                onClick={() => setDocType("coverLetter")}
              ></RadioGroupItem>
              <p className="">Cover Letter</p>
            </div>

            <div className="flex items-center gap-1">
              <RadioGroupItem
                value="project"
                checked={docType === "project"}
                onClick={() => setDocType("project")}
              ></RadioGroupItem>
              <p className="">Project</p>
            </div>
          </div>
        </RadioGroup>
      </div>
      {docType !== null && (
        <UploadButton
          className="bg-button-blue"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            if (docType && job.id) {
              uploadDocument.mutate({ id: job.id, docType, url: res[0]!.url });
            }
            console.log("Files: ", res[0]?.url);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
            modalClose();
          }}
        />
      )}
    </main>
  );
};

export default UploadModalContent;
