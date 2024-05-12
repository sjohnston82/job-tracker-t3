"use client";

import React from "react";
import { useForm } from "react-hook-form";


interface ExtractedData {
  title: string | undefined;
  company: string | undefined;
  location: string | undefined;
}

const NewJobForm = () => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: "",
      company: "",
      location: "",
    },
  });



  return (
    <div className="flex flex-col">
    

    </div>
  );
};

export default NewJobForm;
