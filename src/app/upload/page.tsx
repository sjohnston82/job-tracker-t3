"use client";

import React, { useState } from "react";
import { UploadButton, UploadDropzone } from "~/lib/uploadthing";
import { useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { api } from "~/lib/helpers/api";
import { useJobAppStore } from "~/stores/jobAppStore";
import Link from "next/link";
import { Button } from "../components/ui/button";

type DocType = "resume" | "coverLetter" | "project";

const UploadPage = () => {
  // const [docType, setDocType] = useState<DocType | null>(null);
  const searchParams = useSearchParams();
  const doc = searchParams.get("doc");

  // const { totalJobs } = useJobAppStore();

  // const currentJob = totalJobs.find((job) => job.id === jobID);

  // if (!currentJob) {
  //   return <p>No job found.</p>;
  // }

  // const utils = api.useUtils();

  // const uploadDocument =
  //   api.jobApplicationsRouter.uploadJobDocument.useMutation({
  //     onSuccess: () => utils.invalidate(),
  //     onError: (err) => console.log(err),
  //   });

  return (
    <main className="flex flex-col items-center gap-2 ">
      <div className="">
        <Link href="/">
          <Button variant="default">Return to Dashboard</Button>
        </Link>
      </div>
      {doc && (
        <iframe
          src={doc}
          // style={{ width: "100%", height: "600px", border: "none" }}
          className="h-[90dvh] w-full"
        ></iframe>
      )}
    </main>
  );
};

export default UploadPage;
